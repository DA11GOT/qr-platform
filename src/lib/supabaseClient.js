import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://agjnmyokcvypydrcuwob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnam5teW9rY3Z5cHlkcmN1d29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTU3NTcsImV4cCI6MjA1ODQzMTc1N30.2s0EiKZ47vqxUnEpCt4yTqG5W9MJkvEJY-BGGwoeOD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);