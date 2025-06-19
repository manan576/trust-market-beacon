
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bcdforoqhpvusasrqkxq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjZGZvcm9xaHB2dXNhc3Jxa3hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNzg3ODIsImV4cCI6MjA2NTg1NDc4Mn0.8BnSO771cgFfnj6Rw1O0ylre_Sel6_LgAAMFe95ke_o'

export const supabase = createClient(supabaseUrl, supabaseKey)
