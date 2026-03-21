
const SUPABASE_URL = "https://uvvpunxhnfoeytmsogob.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dnB1bnhobmZvZXl0bXNvZ29iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwODM3OTIsImV4cCI6MjA4OTY1OTc5Mn0.uJxnOUawH_AK_fSCwzm7uv82HOwKkSF56onnP_e76S8";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

window.ecoBattle = {
  client: supabaseClient,
  async getSession() {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      console.error("Supabase session error:", error.message);
      return null;
    }
    return data.session;
  }
};