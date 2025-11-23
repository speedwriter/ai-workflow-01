const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since we're running with node
const envPath = path.resolve(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    process.exit(1);
}

const envConfig = fs.readFileSync(envPath, 'utf8');
envConfig.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        process.env[key.trim()] = value.trim();
    }
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log('Testing connection to:', supabaseUrl);

    // 1. Test Auth Service (simplest ping)
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
        console.error('❌ Auth Service Error:', authError.message);
    } else {
        console.log('✅ Auth Service Reachable');
    }

    // 2. Test Users Table (Public)
    const { error: usersError } = await supabase.from('users').select('count', { count: 'exact', head: true });
    if (usersError) {
        if (usersError.code === '42P01') { // undefined_table
            console.error('❌ Table "users" does not exist. Did you run the migration?');
        } else {
            console.error('❌ Error accessing "users" table:', usersError.message);
        }
    } else {
        console.log('✅ Table "users" exists');
    }

    // 3. Test Business Profiles Table
    const { error: profilesError } = await supabase.from('business_profiles').select('count', { count: 'exact', head: true });
    if (profilesError) {
        if (profilesError.code === '42P01') { // undefined_table
            console.error('❌ Table "business_profiles" does not exist. Did you run the migration?');
        } else {
            console.error('❌ Error accessing "business_profiles" table:', profilesError.message);
        }
    } else {
        console.log('✅ Table "business_profiles" exists');
    }
}

testConnection();
