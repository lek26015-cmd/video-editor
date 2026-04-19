-- Table for skills
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed some default skills if not exists
INSERT INTO skills (name) VALUES 
('ตัดต่อภาพยนตร์ (Narrative)'),
('เกรดสีระดับมืออาชีพ'),
('Advanced Workflow Design'),
('Motion Graphics (Standard)'),
('การจัดการสื่อสำหรับทีมใหญ่'),
('การควบคุมคุณภาพ (QC)'),
('ทัศนคติเชิงบวกในทีม'),
('การแก้ไขปัญหาเฉพาะหน้า'),
('การสื่อสารภายในองค์กร')
ON CONFLICT (name) DO NOTHING;
