$.terminal.xml_formatter.tags.green = (attrs) => {
  return `[[;#44D544;]`;
};
$.terminal.xml_formatter.tags.blue = (attrs) => {
  return `[[;#55F;;${attrs.class}]`;
};

const formatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

const root = "~";
let currentDir = root;
const user = "guest";
const server = "localhost";

const directories = {
  education: [
    "",
    "<white>Education & Awards</white>",
    '* <yellow><a href="https://www.neumont.edu">Neumont College of Computer Science</a></yellow>',
    "* <green>4.0 GPA</green>",
    "* <green>Neumont Academic Coach -- Object Oriented Programming, Sets & Probability, Precalculus, Calculus, Linear Algebra, Statistics</green>",
    "* <green>Neumont eSports Captain -- Super Smash Bros. Ultimate",
    "",
  ],
  projects: [
    "",
    "<white>Personal/Group projects:</white>",
    [
      [
        "QuestTrackr",
        "https://github.com/EukaryoticCS/QuestTrackr",
        "An award-winning, highly-customizable, community-based video game completion tracking website made from scratch in 10 weeks",
      ],
      [
        "Project Decibel",
        "https://github.com/EukaryoticCS/Discord-Soundboard-Bot",
        "A Discord Bot that allows a user to call a command to play a sound effect in the voice chat",
      ],
      [
        "Poker Night at the Mainframe",
        "https://github.com/yourespeakingtothemoon/PokerNightAtTheMainframe",
        "A console-based Texas Hold 'Em simulator with AI-controlled opponents based on various pop culture robots",
      ],
      [
        "Video Game Completion Tracker API",
        "",
        "A microserviced API that meets OpenAPI Specification used for tracking game completion",
      ],
    ].map(([name, url, description = ""]) => {
      const returnString =
        url == "" ? `* <div>${name}</div>` : `* <a href="${url}">${name}</a>`;
      return returnString + `&mdash; <white>${description}</white>`;
    }),
    "",
  ].flat(),
  experience: [
    "",
    "<white>Industry Experience:</white>",
    [
      [
        "Java Software Engineer @ Alpine Data Solutions",
        "https://alpinedatasolutions.com",
        "Jun 2024 - Present",
        [
          "* Developed a build tool for HTML/JS/CSS projects, allowing developers to test Vue microfrontends, resulting in a 25% reduction in setup time for production and testing",
          "* Implemented features for dependency order, minification, and obfuscation, allowing for efficient test builds",
          "* Collaborated with team members to refine and enhance tool functionality, improving developer workflows and increasing overall project efficiency by 30%"
        ],
      ],
      [
        "Cloud Automation Engineer @ AdvancedMD",
        "https://www.advancedmd.com",
        "Jan 2024 - Jun 2024",
        [
          "* Reduced 30GB of wasted space on storage-scarce EC2 instances by automating the process of uploading files to S3 via PowerShell",
          "* Revamped AWS infrastructure with Lambda functions and S3, boosting internal stats website speed by 400%",
          "* Wrote, tested, and called AWS Lambda functions to seamlessly integrate S3 with a published website"
        ],
      ],
    ].map(([company, url, timespan, descriptions]) => {
      return (
        `* <a href="${url}">${company}</a> &mdash; ${timespan}` +
        descriptions.map((desc) => {
          return `\n&nbsp;&nbsp;<white>${desc}</white>`;
        })
      );
    }),
    "",
  ].flat(),
  skills: [
    "",
    "<white>Languages:</white>",
    [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C#",
      "C++",
      "HTML",
      "PowerShell",
      "Dart",
    ].map((lang) => `* <yellow>${lang}</yellow>`),
    "",
    "<white>Frameworks/Libraries:</white>",
    ["Node.js", "Express.js", "React/JSX", "ASP.NET"].map(
      (lib) => `* <green>${lib}</green>`
    ),
    "",
    "<white>Tools:</white>",
    ["NPM", "Postman", "Trello", "Git/GitHub", "Azure DevOps"].map(
      (tool) => `* <blue>${tool}</blue>`
    ),
    "",
    "<white>Database/Cloud:</white>",
    ["MongoDB", "SQL", "MySQL", "SQLite", "AWS (S3, Amplify, Lambda, EC2, DynamoDB, Elastic Beanstalk)"].map(
      (tool) => `* <pink>${tool}</pink>`
    ),
    "",
  ].flat(),
  socials: [
    "",
    "<white>Social Media & Other Links:</white>",
    [
      ["GitHub", "https://github.com/EukaryoticCS"],
      ["LinkedIn", "https://www.linkedin.com/in/eukaryoticcs/"],
      ["Personal Email", "bssmith2021@gmail.com"],
      ["Phone Number", "(479) 883-5205"],
    ].map(([soc, url]) => {
      return `* <a href="${url}">${soc}</a>`;
    }),
    "",
  ].flat(),
};

const dirs = Object.keys(directories);

const fonts = [
  "3D Diagonal",
  "Big Money-se",
  "Big",
  "Doom",
  "Fire Font-k",
  "Ghost",
  "Rectangles",
  "Slant",
  "Soft",
  "Star Wars",
  "Sub-Zero",
  "Varsity",
  "ANSI Shadow",
  "Electronic",
  "Alligator2",
  "Block",
  "Bolger",
  "Caligraphy",
  "Caligraphy2",
  "Colossal",
  "Fender",
  "Georgia11",
  "Marquee",
  "NScript",
  "Rounded",
];

const commands = {
  help() {
    term.echo(`List of available commands: ${help}`);
  },
  echo(...args) {
    if (args.length > 0) {
      term.echo(args.join(" "));
    }
  },
  cd(dir = null) {
    if (dir === null || (dir === ".." && currentDir !== root)) {
      currentDir = root;
    } else if (dir.startsWith("~/") && dirs.includes(dir.substring(2))) {
      currentDir = dir;
    } else if (dirs.includes(dir)) {
      currentDir = root + "/" + dir;
    } else {
      this.error("Wrong directory");
    }
  },
  ls(dir = null) {
    if (dir) {
      if (dir.startsWith("~/")) {
        const path = dir.substring(2);
        const dirs = path.split("/");
        if (dirs.length > 1) {
          this.error("Invalid directory");
        } else {
          const dir = dirs[0];
          this.echo(directories[dir].join("\n"));
        }
      } else if (currentDir === root) {
        if (dir in directories) {
          this.echo(directories[dir].join("\n"));
        } else {
          this.error("Invalid directory");
        }
      } else if (dir === "..") {
        print_dirs();
      } else {
        this.error("Invalid directory");
      }
    } else if (currentDir === root) {
      print_dirs();
    } else {
      const dir = currentDir.substring(2);
      this.echo(directories[dir].join("\n"));
    }
  },
  whoami() {
    term.echo(
      `<white>===============================================</white>\n<white>Name:</white> Brandon Smith\n<white>Role:</white> Full-Stack Software Engineer\n\n<white>Bio:</white>\nThanks for checking out my Portfolio Terminal! I'm Brandon Smith, a senior at Neumont College of Computer Science. I'm very passionate about software development\nand I work hard to continually learn and improve. In high school, I was intent on going to college for musical performance because I loved playing the flute,\nbut after taking an AP Computer Science class with my favorite teacher, Mr. Bean, I knew I wanted to get into programming. I've gone from very simple Python\nprograms to full, feature-rich, cloud-deployed web applications and I'm excited to take my skills even further in industry. I specialize in full-stack development\nespecially in the MERN (MongoDB, Express.js, React.js, and Node.js) tech stack.\n\n\n<white>Click for more info:</white>\n<white >-</white> <blue class="directory">skills</blue><white> - Technical skills, frameworks, languages</white>\n<white>-</white> <blue class="directory">projects</blue><white> - Personal projects, school projects</white>\n<white >-</white> <blue class="directory">socials</blue><white> - Social media & contact links</white>\n<white>===============================================</white>`
    );
  },
};

function print_dirs() {
  term.echo(
    dirs
      .map((dir) => {
        return `<blue class="directory">${dir}</blue>`;
      })
      .join("\n")
  );
}

const command_list = ["clear"].concat(Object.keys(commands));
const formatted_list = command_list.map((cmd) => {
  return `<white class="command">${cmd}</white>`;
});
const help = formatter.format(formatted_list);
const any_command_regex = new RegExp(`^\s*(${command_list.join("|")})`);
$.terminal.new_formatter([any_command_regex, `<white>$1</white>`]);

const font = fonts[rand(fonts.length - 1)];

figlet.defaults({ fontPath: "https://unpkg.com/figlet/fonts/" });
figlet.preloadFonts([font], ready);

function prompt() {
  return `<green>${user}@${server}</green>:<blue>${currentDir}$ `;
}

let term = $("body").terminal(commands, {
  greetings: false,
  checkArity: false,
  exit: false,
  completion() {
    const command = this.get_command();
    const { name, rest } = $.terminal.parse_command(command);
    if (["cd", "ls"].includes(name)) {
      if (rest.startsWith("~/")) {
        return dirs.map((dir) => `~/${dir}`);
      }
      if (currentDir === root) {
        return dirs;
      }
    }
    return Object.keys(commands);
  },
  prompt,
});

term.pause();

function ready() {
  term.clear();
  const seed = rand(256);

  term
    .echo(() => rainbow(render("Brandon Smith"), seed))
    .echo(
      `Welcome to my Terminal Portfolio! Type or click '<white class="command">help</white>' to get started!\n`
    )
    .resume();
}

term.on("click", ".command", function () {
  const command = $(this).text();
  term.exec(command);
});

term.on("click", ".directory", function () {
  const dir = $(this).text();
  term.exec(`cd ~/${dir}`);
  term.exec(`ls`);
});

function rand(max) {
  return Math.floor(Math.random() * (max + 1));
}

function render(text) {
  const cols = term.cols();
  return figlet.textSync(text, {
    font: font,
    width: cols,
    whitespaceBreak: true,
  });
}

function trim(str) {
  return str.replace(/[\n\s]+$/, "");
}

function rainbow(str, seed) {
  return lolcat
    .rainbow(
      function (char, color) {
        char = $.terminal.escape_brackets(char);
        return `[[;${hex(color)};]${char}]`;
      },
      str,
      seed
    )
    .join("\n");
}

function hex(color) {
  return (
    "#" +
    [color.red, color.green, color.blue]
      .map((n) => {
        return n.toString(16).padStart(2, "0");
      })
      .join("")
  );
}
