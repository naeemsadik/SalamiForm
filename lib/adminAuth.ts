import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export const adminAuth = {
  // Signup admin (will be marked as admin if email matches)
  async signup(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: email.split("@")[0],
          },
        },
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  // Login admin
  async login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Verify user is admin
      if (data.user) {
        const { data: adminUser, error: adminError } = await supabase
          .from("admin_users")
          .select("is_admin")
          .eq("id", data.user.id)
          .single();

        if (adminError || !adminUser?.is_admin) {
          await supabase.auth.signOut();
          throw new Error("User is not authorized as admin");
        }
      }

      return { success: true, data };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Get user error:", error);
      return null;
    }
  },

  // Check if user is admin
  async isAdmin(userId: string) {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("is_admin")
        .eq("id", userId)
        .single();

      if (error) return false;
      return data?.is_admin ?? false;
    } catch (error) {
      console.error("Admin check error:", error);
      return false;
    }
  },

  // Subscribe to auth state changes
  onAuthStateChange(callback: (user: any) => void) {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      callback(session?.user || null);
    });

    return data;
  },
};

export default supabase;
