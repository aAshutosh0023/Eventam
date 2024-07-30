
const path = require('path');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
  }
  
  const { createClient } = require('@supabase/supabase-js');
  
 
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  module.exports = supabase;
  