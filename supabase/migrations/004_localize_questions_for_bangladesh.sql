-- Localize default seeded questions for Bangladesh context
-- and remove emoji-heavy/default legacy wording.

UPDATE questions
SET question_text = 'Your full name',
    helper_text = 'Please enter your full name.'
WHERE order_index = 1;

UPDATE questions
SET question_text = 'Your relationship with this person',
    helper_text = 'Choose the option that fits best.'
WHERE order_index = 2;

UPDATE questions
SET question_text = 'How did you react when you met?',
    helper_text = 'Describe your first reaction briefly.'
WHERE order_index = 3;

UPDATE questions
SET question_text = 'First interaction memory',
    helper_text = 'Share a short memory from your first interaction.'
WHERE order_index = 4;

UPDATE questions
SET question_text = 'Your text reaction',
    helper_text = 'Write your reaction in your own words.'
WHERE order_index = 5;

UPDATE questions
SET question_text = 'Which language do they mostly speak?',
    helper_text = 'Pick the most likely language.'
WHERE order_index = 6;

UPDATE questions
SET question_text = 'Their nickname according to you',
    helper_text = 'Add a respectful nickname.'
WHERE order_index = 7;

UPDATE questions
SET question_text = 'Suggested gift amount (BDT)',
    helper_text = 'Use the slider to set an amount in BDT.'
WHERE order_index = 8;

UPDATE questions
SET question_text = 'Why do they deserve it?',
    helper_text = 'Write a short reason.'
WHERE order_index = 9;

UPDATE questions
SET question_text = 'Record a voice message',
    helper_text = 'Record a short audio message or upload one.'
WHERE order_index = 10;

-- Relationship options
UPDATE questions
SET options = jsonb_build_array(
  jsonb_build_object('label', 'Parent', 'value', 'parent'),
  jsonb_build_object('label', 'Grandparent', 'value', 'grandparent'),
  jsonb_build_object('label', 'Sibling', 'value', 'sibling'),
  jsonb_build_object('label', 'Relative', 'value', 'relative'),
  jsonb_build_object('label', 'Friend', 'value', 'friend')
)
WHERE order_index = 2;

-- Language options localized for Bangladesh context
UPDATE questions
SET options = jsonb_build_array(
  jsonb_build_object('label', 'Bangla', 'value', 'bangla'),
  jsonb_build_object('label', 'English', 'value', 'english'),
  jsonb_build_object('label', 'Sylheti', 'value', 'sylheti'),
  jsonb_build_object('label', 'Chittagonian', 'value', 'chittagonian'),
  jsonb_build_object('label', 'Mixed', 'value', 'mixed')
)
WHERE order_index = 6;
