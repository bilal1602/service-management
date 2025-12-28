-- This runs after migrations
-- Seed tenants and auth users

-- Create tenants explicitly with known IDs
INSERT INTO public.tenants (id, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Acme Corporation'),
  ('00000000-0000-0000-0000-000000000002', 'TechStart Inc')
ON CONFLICT (id) DO NOTHING;

-- Insert auth users with tenant_id (not tenant_name) for seeding
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
SELECT 
  gen_random_uuid(),
  email,
  crypt('password123', gen_salt('bf')),
  now(),
  now(),
  now(),
  metadata
FROM (VALUES
  ('admin@acme.com', '{"tenant_id": "00000000-0000-0000-0000-000000000001", "role": "admin", "phone": "+447911123456", "country_code": "+44", "phone_number": "7911123456"}'::jsonb),
  ('manager@acme.com', '{"tenant_id": "00000000-0000-0000-0000-000000000001", "role": "manager", "phone": "+447911123457", "country_code": "+44", "phone_number": "7911123457"}'::jsonb),
  ('member@acme.com', '{"tenant_id": "00000000-0000-0000-0000-000000000001", "role": "member", "phone": "+447911123458", "country_code": "+44", "phone_number": "7911123458"}'::jsonb),
  ('admin@techstart.com', '{"tenant_id": "00000000-0000-0000-0000-000000000002", "role": "admin", "phone": "+447911123459", "country_code": "+44", "phone_number": "7911123459"}'::jsonb),
  ('manager@techstart.com', '{"tenant_id": "00000000-0000-0000-0000-000000000002", "role": "manager", "phone": "+447911123460", "country_code": "+44", "phone_number": "7911123460"}'::jsonb),
  ('member@techstart.com', '{"tenant_id": "00000000-0000-0000-0000-000000000002", "role": "member", "phone": "+447911123461", "country_code": "+44", "phone_number": "7911123461"}'::jsonb)
) AS v(email, metadata)
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE auth.users.email = v.email
);