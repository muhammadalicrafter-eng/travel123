import type { LegalDocumentContent } from "@/content/legal-types";

export const cookiePolicy = {
  title: "Cookie Policy",
  intro: [
    "This Cookie Policy Get a Ticket explains how Get A Ticket uses cookies and similar technologies when you visit our website.",
    "By continuing to use our website, you agree to the use of cookies as described in this policy, unless you choose to disable them through your browser settings.",
  ],
  sections: [
    {
      id: "what-are-cookies",
      title: "What Are Cookies?",
      blocks: [
        {
          paragraphs: [
            "Cookies are small text files that are stored on your device when you visit a website. They help websites function properly, improve user experience, remember preferences, and provide information about how visitors interact with the website.",
            "Cookies do not typically contain information that directly identifies an individual user, but they may be linked to information you voluntarily provide.",
          ],
        },
      ],
    },
    {
      id: "how-we-use-cookies",
      title: "How We Use Cookies",
      blocks: [
        {
          paragraphs: ["We use cookies to:"],
          list: [
            "Ensure the website functions properly",
            "Improve website performance and user experience",
            "Remember user preferences",
            "Analyse website traffic and visitor behaviour",
            "Measure the effectiveness of advertising campaigns",
            "Help protect against fraud and security threats",
          ],
        },
      ],
    },
    {
      id: "types-of-cookies",
      title: "Types of Cookies We Use",
      blocks: [
        {
          heading: "Essential Cookies",
          paragraphs: [
            "These cookies are necessary for the operation of the website and cannot be disabled in our systems.",
          ],
          listIntro: "They help with:",
          list: [
            "Website functionality",
            "Security features",
            "Form submissions",
            "Session management",
          ],
        },
        {
          heading: "Performance and Analytics Cookies",
          paragraphs: [
            "These cookies help us understand how visitors use our website by collecting anonymous information such as:",
          ],
          list: [
            "Pages visited",
            "Time spent on pages",
            "Traffic sources",
            "Website performance metrics",
          ],
        },
        {
          paragraphs: [
            "This information helps us improve our website and services.",
          ],
        },
        {
          heading: "Functionality Cookies",
          paragraphs: [
            "These cookies allow the website to remember choices you make, such as:",
          ],
          list: [
            "Language preferences",
            "Location preferences",
            "Form information",
            "User settings",
          ],
        },
        {
          heading: "Advertising and Marketing Cookies",
          paragraphs: ["These cookies may be used to:"],
          list: [
            "Measure advertising performance",
            "Understand user interests",
            "Display more relevant advertisements",
            "Improve marketing campaigns",
          ],
        },
        {
          paragraphs: [
            "Advertising partners may use these cookies in accordance with their own privacy policies.",
          ],
        },
      ],
    },
    {
      id: "google-services",
      title: "Google Services",
      blocks: [
        {
          paragraphs: [
            "Our website may use services such as Google Analytics, Google Ads, Google Ads Conversion Tracking, and Google Remarketing Services.",
            "These services may use cookies and similar technologies to collect information about website interactions, advertising performance, and visitor behaviour.",
            "The information collected helps us understand how our website is used and improve our marketing activities.",
          ],
        },
      ],
    },
    {
      id: "managing-cookies",
      title: "Managing Cookies",
      blocks: [
        {
          paragraphs: [
            "Most web browsers allow you to control, disable, or delete cookies through browser settings.",
          ],
          listIntro: "You may choose to:",
          list: [
            "Delete existing cookies",
            "Block future cookies",
            "Receive notifications when cookies are placed",
          ],
        },
        {
          paragraphs: [
            "Please note that disabling certain cookies may affect website functionality and your overall browsing experience.",
          ],
        },
      ],
    },
    {
      id: "third-party-cookies",
      title: "Third-Party Cookies",
      blocks: [
        {
          paragraphs: [
            "Some cookies may be placed by third-party service providers that support our website, analytics, advertising, customer support, or marketing activities.",
            "These third parties may collect information according to their own privacy policies and practices.",
          ],
        },
      ],
    },
    {
      id: "updates-to-this-policy",
      title: "Updates to This Policy",
      blocks: [
        {
          paragraphs: [
            "We may update this Cookie Policy from time to time to reflect changes in legal requirements, technology, or our business operations.",
            "Any updates will be published on this page with a revised effective date.",
          ],
        },
      ],
    },
  ],
} satisfies LegalDocumentContent;
