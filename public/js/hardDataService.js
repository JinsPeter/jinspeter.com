var hardDataService = (function() {

    var dateDiff = function(olderDate, newerDate) {
            var oldDate = new Date(olderDate),
                date = newerDate ? new Date(newerDate) : new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate(),
                yy = oldDate.getFullYear(),
                mm = oldDate.getMonth() + 1,
                dd = oldDate.getDate(),
                years, months, days;
            // months
            months = month - mm;
            if (day < dd) {
                months = months - 1;
            }
            // years
            years = year - yy;
            if (month * 100 + day < mm * 100 + dd) {
                years = years - 1;
                months = months + 12;
            }
            // days
            days = Math.floor((date.getTime() - (new Date(yy + years, mm + months - 1, dd)).getTime()) / (24 * 60 * 60 * 1000));
            //
            return {
                years: years,
                months: months,
                days: days
            };
        },
        totalExperience = () => {
            var totalExp = dateDiff('06/08/2015');
            return {
                obj: totalExp,
                text: totalExp.years ? totalExp.years + " years " : "" + totalExp.months ? totalExp.months + "and months" : ""
            }
        };

    var socialInfo = [{
            target: "_blank",
            url: "https://www.linkedin.com/in/jins-peter-129161ab/",
            cssClass: "fa fa-linkedin"
        }, {
            target: "_blank",
            url: "https://stackoverflow.com/users/6128864/jins-peter",
            cssClass: "fa fa-stack-overflow"
        }, {
            target: "_self",
            url: "skype:jins.peter94?call",
            cssClass: "fa fa-skype"
        }, {
            target: "_blank",
            url: "https://www.facebook.com/jinspeterramanattu",
            cssClass: "fa fa-facebook"
        }, {
            target: "_blank",
            url: "https://plus.google.com/+JinsPeterisme",
            cssClass: "fa fa-google-plus"
        }, {
            target: "_blank",
            url: "https://www.instagram.com/jinspeter/",
            cssClass: "fa fa-instagram"
        }, {
            target: "_blank",
            url: "https://twitter.com/PeterJins",
            cssClass: "fa fa-twitter"
        }],
        education = [{
            name: "Professional",
            course: "Bachelor of Technology",
            specialization: "Electrical and Electronics Engineering",
            institution: "Government Engineering College, Thrissur",
            university: "University of Calicut",
            duration: "Sept 2011 - May 2015",
            passYear: 2015,
            percentage: 69.3,
            get description() {
                return "I completed my technology graduation in " + this.specialization + " from " + this.institution + " under " +
                    this.university + " during " + this.duration + " with an overall " + this.percentage + "%.";
            }
        }, {
            name: "Secondary School",
            course: "XII",
            specialization: "Maths and Computer Science",
            institution: "Vimalagiri Public School, Kothamangalam",
            university: "CBSE",
            duration: "July 2009 - March 2011",
            passYear: 2011,
            percentage: 91,
            get description() {
                return "Senior Secondary Schooling from " + this.institution + ", studied " + this.specialization + " and graduated with " + this.percentage + "%.";
            }
        }, {
            name: "High School",
            course: "Upto X Grade",
            specialization: "NA",
            institution: "Vimalagiri Public School, Kothamangalam",
            duration: "Upto March 2009",
            university: "CBSE",
            passYear: 2009,
            percentage: 85,
            get description() {
                return "High School graduated in the year " + this.passYear + " with an " + this.percentage + "% aggregate."
            }
        }],
        services = [{
            name: "Web design",
            icon: "fa fa-paint-brush",
            description: "I can make user friendly web pages using HTML5 and CSS3. Bootstrap is my favourite framework for this."
        }, {
            name: "Web Application",
            icon: "icon-window",
            description: "Being quite a bit knowledged in JavaScript, Typescript, Angular, Aurelia and AngularJS, I can make dynamic single page client side web applications."
        }, {
            name: "Web Server",
            icon: "fa fa-globe",
            description: "Well experienced with modern .NET web frameworks, development of ASP.NET, ASP.NET Core rest APIs or an ASP.NET MVC application is handy."
        }, {
            name: "Cloud based DevOps",
            icon: "icon-cloud",
            description: "A little knowledge of web application hosting over the cloud completes my profile caption 'A full-stack web application developer'. For a client side app, Firebase will suffice while for server side apps, I'd go with Azure."
        }, {
            name: "Serverless Systems",
            icon: "fa fa-bolt",
            description: "This is more of a hack for rather small server requirements of client side application like this web page. For example, the contact me option in this page actually works."
        }, {
            name: "Solution Consultation",
            icon: "icon-chat",
            description: "Talk to me about your business or your business situation. I'll come up with solution for it."
        }],
        career = [{
            position: "Software Architect",
            stream: "Solutions Architect",
            company: "intelliflo",
            companyLegalName: "Intelliflo Software India Pvt. Ltd",
            duration: "January 2024 - Still doing this",
            experience: dateDiff('01/01/2024'),
            ageFrom: dateDiff('01/01/2024'),
            get experienceText() {
                return `${this.experience.years ? this.experience.years + " years" : ""}${this.experience.years && this.experience.months && this.experience.days ? "," : this.experience.years&&(this.experience.months||this.experience.days) ? "and": "" } ${this.experience.months ? this.experience.months + " months" : ""} ${(this.experience.years||this.experience.months)&&this.experience.days ? "and " + this.experience.days +" days":""}`;
            },
            get description() {
                return `Still the same company. Got promoted as a Software Architect ${this.ageFrom.years ? this.ageFrom.years + " years" : ""} ${this.ageFrom.years && this.ageFrom.months ? "and" : ""} ${this.ageFrom.months ? this.ageFrom.months + " months" : ""} ago. I am still managing the modernization of our system. But, roles come with bigger responsibilities. Trying my best to swim across the current without drowning.`;
            }
        },{
            position: "Principal Software Engineer",
            stream: "Application Developer",
            company: "intelliflo",
            companyLegalName: "Intelliflo Software India Pvt. Ltd",
            duration: "February 2021 - December 2023",
            experience: dateDiff('02/01/2021', '01/01/2024'),
            ageFrom: dateDiff('02/01/2021'),
            get experienceText() {
                return `${this.experience.years} years and ${this.experience.months} months`;
            },
            get description() {
                return `This is still the same company with a new name. I got promoted as a Principal Software Engineer by early 2021 and was tasked as the solution maker of the team. I enjoyed doing this for ${this.experienceText}. I designed applications, feasibility studied and adopted new technologies like gRPC and Docker, mentored and encouraged team members to improve on their learning and skill set. I also integrated Nuke based build systems to enhance legacy CI systems to use Domain Service Language (C# in my case) based build tooling. I was also entrusted to identify and manage the effort to modernize our main product.`;
            }
        }, {
            position: "Senior Software Engineer",
            stream: "Full Stack developer",
            company: "RedBlack",
            companyLegalName: "RedBlack Software Pvt. Ltd.",
            duration: "June 2018 - January 2021",
            experience: dateDiff('06/04/2018', '01/31/2020' ),
            ageFrom: dateDiff('06/04/2018'),
            get experienceText() {
                return `${this.experience.years} years, ${this.experience.months} months and ${this.experience.days}`;
            },
            get description() {
                return `I started here as Senior Software Engineer ${this.ageFrom.years} years ${this.ageFrom.months ? "and" + this.ageFrom.months + " months" : ""} back and worked on our huuuge investment management product as a full stack web  application developer. Started learning my technology deeper rather than wider. Got to work with Aurelia (my third SPA framework). I enjoyed the resposbilities like reviewing code and recommending best practices.`;
            }
        }, {
            position: "Software Engineer",
            stream: ".NET",
            company: "QBurst",
            companyLegalName: "QBurst Technologies Pvt. Ltd.",
            duration: "June 2015 - May 2018",
            experience: dateDiff('06/08/2015', '05/31/2018'),
            ageFrom: dateDiff('06/08/2015'),
            get experienceText() {
                return `${this.experience.years} years, ${this.experience.months} months and ${this.experience.days} days`;
            },
            get description() {
                return `I joined here a fresher ${this.ageFrom.years} years ago and this place was my time killer
                    for nearly ${this.experience.years + 1} years. I got to work on 3 projects as a full stack developer during the period. I was able to gain a variety of diversified technology exposure from here.`;
            }
        }],

        skillset = [{
            name: "HTML5 + CSS3",
            rating: 80
        }, {
            name: "JavaScript + TypeScript",
            rating: 80
        }, {
            name: "ASP.NET",
            rating: 80
        }, {
            name: "Angular 5",
            rating: 80
        }, {
            name: ".NET",
            rating: 80
        }, {
            name: "Nuke Build",
            rating: 80
        }, {
            name: "Docker",
            rating: 60
        }, {
            name: "Angular JS",
            rating: 85
        }, {
            name: "Azure Services",
            rating: 65
        }, {
            name: "FIX",
            rating: 80
        }, {
            name: "Entity Framework",
            rating: 70
        }, {
            name: "EF Core 2.0",
            rating: 70
        }, {
            name: "ASP.NET MVC",
            rating: 65
        }],
        skillInfo = {
            header: "Skillset and Knowledge",
            description: "I try to improve this part each day.",
            skills: skillset
        },
        servicesInfo = {
            header: "What Can I do for You?",
            description: "I'm Software engineer with over " + totalExperience().text + " experience in developing web applications on .NET and AngularJS.",
            services: services
        },
        resumeInfo = {
            header: "More of my credentials.",
            description: "I'm a .NET based full-stack solution developer. I love solving business redundancies by automating it. Most of my works are web applications built on Angular, AngularJS or Aurelia with ASP.NET or ASP.NET Core at the server side.",
            education: education,
            career: career
        },

        profile = {
            resumeSectionObj: resumeInfo,
            education: education,
            skillSectionObj: skillInfo,
            career: career
        };
    return {
        getSkillInfo: skillInfo,
        getResumeInfo: resumeInfo,
        getSocialUrls: socialInfo,
        getServicesInfo: servicesInfo,
        getTotalExperience: totalExperience
    }
})();