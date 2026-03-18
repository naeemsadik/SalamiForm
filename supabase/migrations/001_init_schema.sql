-- Create questions table
CREATE TABLE questions (
  id BIGSERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  helper_text TEXT,
  question_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'textarea', 'mcq', 'slider', 'audio'
  options JSONB, -- For MCQ questions: {options: [{label: string, value: string}]}
  order_index INT NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID,
  CONSTRAINT fk_created_by FOREIGN KEY (created_by) REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Create submissions table (metadata only)
CREATE TABLE submissions (
  id BIGSERIAL PRIMARY KEY,
  user_session_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submission_answers table (flexible structure)
CREATE TABLE submission_answers (
  id BIGSERIAL PRIMARY KEY,
  submission_id BIGINT NOT NULL,
  question_id BIGINT NOT NULL,
  answer TEXT, -- All answers stored as TEXT (can be plain text, JSON, or file URL)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_submission FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE,
  CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE(submission_id, question_id)
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_auth_user FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX idx_questions_order ON questions(order_index);
CREATE INDEX idx_questions_active ON questions(is_active);
CREATE INDEX idx_submissions_session ON submissions(user_session_id);
CREATE INDEX idx_submission_answers_submission ON submission_answers(submission_id);
CREATE INDEX idx_submission_answers_question ON submission_answers(question_id);

-- Enable RLS
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for questions (public read, admin write)
CREATE POLICY "Anyone can read active questions" ON questions
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admin can manage questions" ON questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_admin = TRUE
    )
  );

-- RLS Policies for submissions (anyone can insert, admin can view)
CREATE POLICY "Users can insert submissions" ON submissions
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admin can view all submissions" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_admin = TRUE
    )
  );

-- RLS Policies for submission_answers (anyone can insert for their own submission, admin can view all)
CREATE POLICY "Users can insert answers for their submission" ON submission_answers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM submissions
      WHERE submissions.id = submission_answers.submission_id
    )
  );

CREATE POLICY "Admin can view all answers" ON submission_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE admin_users.id = auth.uid() AND admin_users.is_admin = TRUE
    )
  );

-- RLS Policies for admin_users
CREATE POLICY "Admin can view admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users admin_check
      WHERE admin_check.id = auth.uid() AND admin_check.is_admin = TRUE
    )
  );

-- Insert default questions
INSERT INTO questions (question_text, helper_text, question_type, order_index, is_active) VALUES
  ('Your Full Name', 'We need to know who you are!', 'text', 1, TRUE),
  ('Your Relationship with the Elder', 'Are you a cousin, nephew, friend, or something unique?', 'mcq', 2, TRUE),
  ('How did you react when you saw them?', 'Did you jump? Scream? Cry tears of joy?', 'text', 3, TRUE),
  ('First Interaction Memory', 'What''s your favorite memory with them?', 'textarea', 4, TRUE),
  ('Your Text Reaction', 'React in text to what they deserve!', 'textarea', 5, TRUE),
  ('Guess: What language will they speak?', 'What''s your prediction?', 'mcq', 6, TRUE),
  ('Their Nickname According to You', 'What do you call them affectionately?', 'text', 7, TRUE),
  ('How much Eidi they deserve? (in PKR)', 'Slide to show appreciation!', 'slider', 8, TRUE),
  ('Why do they deserve it?', 'Give us the real reason!', 'textarea', 9, TRUE),
  ('Record a Voice Message', 'Send them love through your voice!', 'audio', 10, TRUE);

-- Insert default MCQ options
UPDATE questions SET options = jsonb_build_array(
  jsonb_build_object('label', 'Cousin', 'value', 'cousin'),
  jsonb_build_object('label', 'Nephew/Niece', 'value', 'nephew_niece'),
  jsonb_build_object('label', 'Friend', 'value', 'friend'),
  jsonb_build_object('label', 'Sibling', 'value', 'sibling'),
  jsonb_build_object('label', 'Something Unique 🎀', 'value', 'unique')
) WHERE order_index = 2;

UPDATE questions SET options = jsonb_build_array(
  jsonb_build_object('label', 'Urdu', 'value', 'urdu'),
  jsonb_build_object('label', 'English', 'value', 'english'),
  jsonb_build_object('label', 'Punjabi', 'value', 'punjabi'),
  jsonb_build_object('label', 'Mix of All', 'value', 'mix'),
  jsonb_build_object('label', 'No idea 😅', 'value', 'no_idea')
) WHERE order_index = 6;
