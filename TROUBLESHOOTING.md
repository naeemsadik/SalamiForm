# 🛠️ Troubleshooting Guide

Solutions for common issues.

## 🔴 Critical Issues

### "Missing Supabase environment variables"

**Problem**: Form won't load, error in console.

**Causes**:
- `.env.local` doesn't exist
- Keys are wrong
- Dev server hasn't been restarted

**Solution**:
1. Create `.env.local` in project root
2. Copy from `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
3. Add your Supabase keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
   ```
4. **Restart dev server**: Press Ctrl+C then `npm run dev`
5. Refresh browser page

---

### "Form won't submit / Getting error 404"

**Problem**: Submit button does nothing or shows error.

**Causes**:
- Supabase table doesn't exist
- Validation failing silently
- Network error

**Solution**:
1. Open browser **DevTools** (F12)
2. Go to **Console** tab
3. Look for red error messages
4. Try submitting again, note the error
5. Check Supabase dashboard:
   - Go to **Database** → **Tables**
   - Verify `submissions` table exists
6. Check **Network** tab:
   - Look for requests to supabase
   - Check response status (should be 200)

---

### "Audio upload fails"

**Problem**: Can't upload audio file, or upload seems stuck.

**Causes**:
- Storage bucket doesn't exist or wrong name
- Bucket not public
- File too large (>10MB)
- Audio format not supported

**Solution**:
1. Check bucket name:
   - Supabase → **Storage**
   - Must be named exactly `eid-audio`
   
2. Check bucket is public:
   - Click bucket name
   - Click **Policies**
   - Should have "Public bucket" policy
   - If not, create:
     - **Create policy** → **Public bucket template** → **Save**

3. Check file:
   - Max 15 seconds audio
   - Format: MP3, WAV, M4A
   - File size under 10MB

4. Check browser console (F12):
   - Look for error messages
   - Share error message for support

---

## 🟡 Common Issues

### "Form validation keeps blocking me"

**Problem**: Can't proceed past a step, validation error.

**Causes**:
- Field doesn't meet requirements
- Special characters not allowed
- Min/max length not met

**Solution**:
Check error message under the field:
- **"too short"**: Add more characters
- **"too long"**: Remove characters
- **"required"**: Don't leave empty
- **"You can't skip this"**: Must select an option

Fix the field and try again.

---

### "Animations are choppy / stuttering"

**Problem**: Smooth animations appear janky.

**Causes**:
- GPU acceleration disabled
- Too many processes running
- Browser rendering issue

**Solution**:
1. Check browser: Use Chrome/Edge for best performance
2. Close other tabs (especially video/gaming)
3. Clear browser cache:
   - F12 → Settings → Clear site data
4. Try incognito mode (F11 key)
5. Check GPU acceleration:
   - Chrome → Settings → System → Enable hardware acceleration

---

### "Styles look weird / colors wrong"

**Problem**: Colors, fonts, or layout appears broken.

**Causes**:
- Tailwind not compiled
- CSS not loaded
- Browser cache issue

**Solution**:
1. Clear `.next` folder:
   ```bash
   rm -rf .next
   npm run dev
   ```

2. Clear browser cache:
   - F12 → Settings → Clear site data

3. Hard refresh browser:
   - Press Ctrl+Shift+R (Windows)
   - Press Cmd+Shift+R (Mac)

---

### "Buttons not responding / clicking doesn't work"

**Problem**: Click doesn't do anything or takes several clicks.

**Causes**:
- Component not loading
- JavaScript error
- Form state issue

**Solution**:
1. Check console for errors (F12)
2. Verify form has valid data (check all fields)
3. Try hard refresh (Ctrl+Shift+R)
4. Check network requests:
   - F12 → Network tab
   - Try action again
   - Look for failed requests

---

## 🟢 Minor Issues

### "Confetti animation not showing on success"

**Solution**:
- Lottie might be slow to load
- Wait a moment on success screen
- Refresh page

---

### "Audio player won't play"

**Solution**:
1. Check file uploaded successfully (see filename)
2. Try different browser
3. Check file format (MP3, WAV, M4A)
4. Check browser autoplay settings

---

### "Form takes too long to load"

**Solution**:
1. Check internet connection
2. Check Supabase status (supabase.com)
3. Clear browser cache
4. Try different browser

---

## 🔧 Debugging Tips

### Enable Console Logging

Edit `lib/supabase.ts`:

```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Add logging
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event, session);
});
```

### Check Network Requests

1. Open DevTools (F12)
2. Go to **Network** tab
3. Perform an action
4. Look for `/rest/v1/` requests
5. Click request to see details:
   - **Request**: What data was sent
   - **Response**: What came back
   - **Status**: 200 (success), 4xx (error)

### Check Supabase Logs

1. Go to Supabase dashboard
2. Click **Logs** section
3. Look for your recent queries
4. Check for error messages

### Browser DevTools Tips

| Feature | Shortcut |
|---------|----------|
| Toggle DevTools | F12 |
| Console | Ctrl+Shift+J |
| Network | Ctrl+Shift+E |
| Performance | F12 → Performance |
| Elements | Ctrl+Shift+C |

---

## 🆘 Still Stuck?

### Check These First

1. **Read the error message** - Copy it exactly
2. **Google the error** - Likely someone had it
3. **Check Supabase status** - Is service down?
4. **Restart everything** - Dev server, browser, Supabase
5. **Clear cache** - Browser cache + `.next` folder

### Get Help

1. **Supabase Discord**: https://discord.supabase.com
2. **Next.js Discord**: https://discord.gg/nextjs
3. **Stack Overflow**: Tag `supabase`, `next.js`
4. **GitHub Issues**: Create issue with:
   - Error message (copy-paste)
   - Steps to reproduce
   - Your environment (Node.js version, etc)

### Provide Good Error Reports

When reporting issues, include:
- **Error message**: Exact text
- **Steps**: What you did before error
- **Environment**: Node version, OS, browser
- **Screenshot**: If visual issue
- **Logs**: Browser console or Supabase logs

---

## ✨ Performance Optimization

If everything works but slow:

### Database Performance
```sql
-- Optimize submissions table
CREATE INDEX idx_created_at ON submissions(created_at DESC);
CREATE INDEX idx_relationship ON submissions(relationship);
```

### Browser Performance
1. Disable browser extensions
2. Close other applications
3. Use Chrome DevTools **Performance** tab
4. Look for slow scripts/rendering

### Network Performance
1. Check internet speed: speedtest.net
2. Try different network (WiFi vs cellular)
3. Check Supabase latency: Supabase → Database → Monitoring

---

Need more help? Check the other documentation files! 📚
