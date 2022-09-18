import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const PRIVATE_SUPABASE_KEY = import.meta.env.PRIVATE_SUPABASE_KEY;
const PUBLIC_SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_KEY;
const SUPABASE_KEY = PRIVATE_SUPABASE_KEY || PUBLIC_SUPABASE_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabaseClient;
