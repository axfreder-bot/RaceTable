Pod::Spec.new do |s|
  s.name         = "RaceTableCalendar"
  s.version      = "1.0.0"
  s.summary      = "Calendar native module stub for RaceTable"
  s.description  = "A stub native module for RaceTable to verify native module pipeline"
  s.homepage     = "https://github.com/axfreder-bot/RaceTable"
  s.license      = "MIT"
  s.author       = { "Alex Frederick" => "alex@racetable.app" }
  s.platform     = :ios, "13.4"
  s.source       = { :path => "." }
  s.source_files = "*.{h,m,swift}"
  s.dependency "React-Core"
end
