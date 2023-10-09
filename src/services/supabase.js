import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tnowvcwzbvdmuiadsewx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRub3d2Y3d6YnZkbXVpYWRzZXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNjg2ODEsImV4cCI6MjAxMDY0NDY4MX0.lYyNEoLUCdIzzehLJgus2YFeeARWR5LqpqULbevPE8Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
