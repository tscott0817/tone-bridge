import { createClient } from '@supabase/supabase-js';

const url = 'https://mpydfxbbkutwvckntwdb.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1weWRmeGJia3V0d3Zja250d2RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODAzMzgsImV4cCI6MjA1MTc1NjMzOH0.bBq06-lFJA4MTYqugszQIAY8XtJ3lVnthTJgPxQmPfM';

export const supabase = createClient(url, key);
