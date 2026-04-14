import { createClient } from '@supabase/supabase-js';

// PASTE YOUR KEYS HERE FROM STEP 3
const supabaseUrl = 'https://wnehziraxifuyzbheimv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InduZWh6aXJheGlmdXl6YmhlaW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMDg0NDAsImV4cCI6MjA5MTY4NDQ0MH0.frP6QmjQ5kZoY9VSEXnff2zqDLe-LwTsKSRY2hU5eeo';

export const supabase = createClient(supabaseUrl, supabaseKey);