import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://pcmqozeqobbhktpddnya.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbXFvemVxb2JiaGt0cGRkbnlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MDk0ODcsImV4cCI6MjAyNDA4NTQ4N30.YPH-sJqCL8ASPSzjg1AyhpWW6wEWZcpxRkducWOeFZM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
