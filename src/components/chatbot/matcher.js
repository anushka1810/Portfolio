export const findAnswer = (question, profile) => {
  const q = question.toLowerCase().trim();
  const normalized = q.replace(/[^\w\s+]/g, ' ').replace(/\s+/g, ' ').trim();
  const skillsByCategory = profile.skills.reduce((acc, group) => {
    acc[group.category] = group.skills.map((s) => s.name);
    return acc;
  }, {});
  const allSkills = Object.values(skillsByCategory).flat();
  const projects = profile.projects.map((p) => ({
    ...p,
    titleLower: p.title.toLowerCase(),
  }));
  const projectTokens = projects.map((p) => ({
    title: p.title,
    tokens: p.titleLower.replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean),
  }));

  // Greeting
  if (normalized.match(/^(hi|hii|hiii|hello|hey|howdy|sup|yo|good morning|good afternoon|good evening)$/)) {
    return `👋 Hi there! I'm Anuj's virtual assistant. I can tell you about his skills, projects, achievements, certifications, education, and contact info. What would you like to know?`;
  }

  // Projects — specific project queries
  if (normalized.includes('nivana') || normalized.includes('mental wellness') || normalized.includes('wellness')) {
    const p = projects.find(proj => proj.titleLower.includes('nivana'));
    return p ? `🧘 **${p.title}** (${p.tech.join(', ')})\n\n${p.description}` : "I couldn't find details about that project.";
  }

  if (normalized.includes('shortest path') || normalized.includes('dijkstra') || normalized.includes('graph') || normalized.includes('path finder')) {
    const p = projects.find(proj => proj.titleLower.includes('shortest path'));
    return p ? `🗺️ **${p.title}** (${p.tech.join(', ')})\n\n${p.description}` : "I couldn't find details about that project.";
  }

  if (normalized.includes('volunteer hub') || normalized.includes('volunteer')) {
    const p = projects.find(proj => proj.titleLower.includes('volunteer'));
    return p ? `🤝 **${p.title}** (${p.tech.join(', ')})\n\n${p.description}` : "I couldn't find details about that project.";
  }

  // Projects — "tell me about X" (generic)
  if (normalized.startsWith('tell me about') || normalized.startsWith('about')) {
    const match = projectTokens.find((p) => p.tokens.some((t) => normalized.includes(t)));
    if (match) {
      const p = projects.find((proj) => proj.title === match.title);
      if (p) {
        return `✨ **${p.title}** (${p.tech.join(', ')})\n\n${p.description}`;
      }
    }
  }

  // Who is Anuj / about
  if (normalized.includes('who is') || normalized.includes('about anuj') || normalized.includes('introduce') || normalized.includes('summary') || normalized.includes('background')) {
    return `🙋 ${profile.basics.name} is a ${profile.basics.title} based in ${profile.basics.location}.\n\n${profile.basics.summary}\n\nHe's currently pursuing ${profile.education[0]?.school || 'a degree in Computer Science Engineering'}.`;
  }

  // Projects — general
  if (normalized.includes('project') || normalized.includes('build') || normalized.includes('built') || normalized.includes('portfolio') || normalized.includes('made') || normalized.includes('created') || normalized.includes('developed')) {
    return `🚀 Anuj has worked on ${profile.projects.length} key projects:\n\n${profile.projects.map((p, i) => `${i + 1}. **${p.title}** (${p.tech.join(', ')})\n   ${p.description}`).join('\n\n')}`;
  }

  // Skills — specific tech
  const mentionedSkill = allSkills.find(skill => {
    // Escape special regex chars (e.g. C++)
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Word boundary: skill must not be surrounded by other letters
    const pattern = new RegExp(`(?<![a-zA-Z])${escaped}(?![a-zA-Z])`, 'i');
    return pattern.test(q);
  });
  if (mentionedSkill) {
    const category = Object.entries(skillsByCategory).find(([, skills]) =>
      skills.map(s => s.toLowerCase()).includes(mentionedSkill.toLowerCase())
    );
    const categoryName = category ? category[0] : 'skills';
    return `✅ Yes! Anuj knows **${mentionedSkill}**. It's listed under his ${categoryName} skills.\n\nFull ${categoryName} stack: ${category ? category[1].join(', ') : mentionedSkill}`;
  }

  // Skills — general
  if (normalized.includes('skill') || normalized.includes('know') || normalized.includes('tech') || normalized.includes('language') || normalized.includes('stack') || normalized.includes('frontend') || normalized.includes('backend') || normalized.includes('database') || normalized.includes('tools') || normalized.includes('experti')) {
    return `💻 Anuj's technical skills:\n\n${Object.entries(skillsByCategory).map(([cat, skills]) => `• **${cat}**: ${skills.join(', ')}`).join('\n')}`;
  }

  // Education
  if (normalized.includes('education') || normalized.includes('study') || normalized.includes('college') || normalized.includes('university') || normalized.includes('degree') || normalized.includes('btech') || normalized.includes('b tech') || normalized.includes('student') || normalized.includes('studying') || normalized.includes('qualification')) {
    const edu = profile.education[0];
    return edu
      ? `🎓 ${edu.status} — **${edu.school}**\n\n${edu.details}`
      : "🎓 Education details are not available right now.";
  }

  // DSA Profiles
  if (normalized.includes('profile') || normalized.includes('codolio') || normalized.includes('geeksforgeeks') || normalized.includes('gfg') || normalized.includes('coding profile') || normalized.includes('competitive programming')) {
    return `📊 Anuj's coding profiles:\n\n• 🟡 LeetCode: ${profile.dsaProfiles.leetcode}\n• 🟢 HackerRank: ${profile.dsaProfiles.hackerrank}\n• 🟢 GeeksForGeeks: ${profile.dsaProfiles.geeksforgeeks}\n• 🔵 Codolio: ${profile.dsaProfiles.codolio}`;
  }

  // Achievements
  if (normalized.includes('achievement') || normalized.includes('award') || normalized.includes('star') || normalized.includes('hackerrank') || normalized.includes('dsa') || normalized.includes('problem solving') || normalized.includes('leetcode') || normalized.includes('competitive') || normalized.includes('accomplish')) {
    return `🏆 Anuj's achievements:\n\n${profile.achievements.map(a => `• ${a.title}`).join('\n')}`;
  }

  // DSA counts / problems solved
  if (
    normalized.includes('problems solved') ||
    normalized.includes('problem solved') ||
    normalized.includes('questions solved') ||
    normalized.includes('question solved') ||
    normalized.includes('solved') ||
    normalized.includes('total solved') ||
    normalized.includes('dsa stats')
  ) {
    const totalSolved = profile.dsaStats.reduce((acc, curr) => acc + curr.problemsSolved, 0);
    return `🧠 DSA progress:\n\n• Total solved: **${totalSolved}**\n${profile.dsaStats.map(s => `• ${s.platform}: ${s.problemsSolved} (${s.rating})`).join('\n')}\n\nWant profile links too? Just ask "DSA profiles".`;
  }

  // Follow-up confirmations
  if (normalized === 'yes' || normalized === 'yes please' || normalized === 'sure' || normalized === 'ok' || normalized === 'okay') {
    return `📊 Anuj's coding profiles:\n\n• 🟡 LeetCode: ${profile.dsaProfiles.leetcode}\n• 🟢 HackerRank: ${profile.dsaProfiles.hackerrank}\n• 🟢 GeeksForGeeks: ${profile.dsaProfiles.geeksforgeeks}\n• 🔵 Codolio: ${profile.dsaProfiles.codolio}`;
  }

  // Certifications
  if (normalized.includes('certif') || normalized.includes('course') || normalized.includes('nptel') || normalized.includes('oracle') || normalized.includes('mongodb') || normalized.includes('freecodecamp') || normalized.includes('credential') || normalized.includes('badge')) {
    return `📜 Anuj's certifications:\n\n${profile.certifications.map(c => `• ${c.title}`).join('\n')}`;
  }

  // Contact / social
  if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('reach') || normalized.includes('hire') || normalized.includes('connect') || normalized.includes('linkedin') || normalized.includes('github') || normalized.includes('social') || normalized.includes('phone') || normalized.includes('whatsapp') || normalized.includes('instagram')) {
    return `📬 You can reach Anuj here:\n\n📧 **Email**: ${profile.basics.email}\n📱 **Phone**: ${profile.contact?.phone || 'N/A'}\n💬 **WhatsApp**: ${profile.contact?.whatsapp || 'N/A'}\n💼 **LinkedIn**: ${profile.social.linkedin}\n📸 **Instagram**: ${profile.social.instagram || 'N/A'}\n🐙 **GitHub**: ${profile.social.github}`;
  }

  // Experience / work
  if (normalized.includes('experience') || normalized.includes('internship') || normalized.includes('intern') || normalized.includes('job') || normalized.includes('work experience')) {
    return `💼 Anuj is currently a student and has built strong practical experience through personal projects including a MERN stack wellness platform, algorithm visualizers, and volunteer management systems. He's actively looking for internship and full-time opportunities!\n\n📬 Reach him at: ${profile.basics.email}`;
  }

  // Location
  if (normalized.includes('locat') || normalized.includes('where') || normalized.includes('country') || normalized.includes('city') || normalized.includes('based')) {
    return `📍 Anuj is based in **${profile.basics.location}** and is open to remote opportunities.`;
  }

  // Fallback
  return `🤔 I'm not sure about that! Try asking me about:\n\n• 💻 Skills & tech stack\n• 🚀 Projects\n• 🎓 Education\n• 🏆 Achievements\n• 📜 Certifications\n• 📬 Contact info\n\nOr reach Anuj directly at **${profile.basics.email}**!`;
};
