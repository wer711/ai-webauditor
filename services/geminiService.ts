
import { GoogleGenAI, Type } from "@google/genai";
import type { AuditReport } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
  type: Type.OBJECT,
  properties: {
    seo: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "SEO score out of 100." },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              check: { type: Type.STRING, description: "The SEO aspect checked, e.g., 'Page Title'." },
              result: { type: Type.STRING, description: "The result of the check, e.g., 'Title is 65 characters long.' or 'Missing'." },
              status: { type: Type.STRING, description: "Status: 'pass', 'fail', 'warn', or 'info'." }
            },
            required: ["check", "result", "status"]
          }
        }
      },
      required: ["score", "findings"]
    },
    performance: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Performance score out of 100." },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              check: { type: Type.STRING },
              result: { type: Type.STRING },
              status: { type: Type.STRING }
            },
            required: ["check", "result", "status"]
          }
        }
      },
      required: ["score", "findings"]
    },
    security: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Security score out of 100." },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              check: { type: Type.STRING, description: "e.g., 'HTTPS Check', 'Content-Security-Policy'." },
              result: { type: Type.STRING, description: "e.g., 'Enabled', 'Header not found'." },
              status: { type: Type.STRING }
            },
            required: ["check", "result", "status"]
          }
        }
      },
      required: ["score", "findings"]
    },
    accessibility: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "Accessibility score out of 100." },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              check: { type: Type.STRING, description: "e.g., 'Lang attribute', 'Basic Contrast'." },
              result: { type: Type.STRING, description: "e.g., '`lang=\"en\"` found', 'Low contrast found on 3 elements'." },
              status: { type: Type.STRING }
            },
            required: ["check", "result", "status"]
          }
        }
      },
      required: ["score", "findings"]
    },
    commerce: {
      type: Type.OBJECT,
      properties: {
        score: { type: Type.NUMBER, description: "E-commerce readiness score out of 100." },
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              check: { type: Type.STRING, description: "e.g., 'Schema.org Product', 'JSON-LD Offer'." },
              result: { type: Type.STRING, description: "e.g., 'Product schema detected', 'Offer schema not found'." },
              status: { type: Type.STRING }
            },
            required: ["check", "result", "status"]
          }
        }
      },
      required: ["score", "findings"]
    },
    brokenLinks: {
      type: Type.OBJECT,
      properties: {
        findings: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              url: { type: Type.STRING, description: "The URL of the broken link found." },
              status: { type: Type.NUMBER, description: "The HTTP status code, e.g., 404." }
            },
            required: ["url", "status"]
          }
        }
      },
      required: ["findings"]
    },
    quickWins: {
      type: Type.ARRAY,
      description: "A list of 3-5 easy, high-impact suggestions.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "The title of the quick win." },
          suggestion: { type: Type.STRING, description: "A short suggestion on how to implement the fix." }
        },
        required: ["title", "suggestion"]
      }
    }
  },
  required: ["seo", "performance", "security", "accessibility", "commerce", "brokenLinks", "quickWins"]
};


export const analyzeSite = async (url: string): Promise<AuditReport> => {
  const prompt = `
    Analyze the website at the URL: ${url}.
    
    You are a world-class site auditor. Your task is to provide a detailed audit report covering SEO, Performance, Security, Accessibility, and E-commerce Readiness. You cannot actually access the URL, so you must generate a realistic and comprehensive audit based on common issues and best practices for a website that might exist at such a URL.
    
    For each category, provide a score from 0 to 100. A score of 0-49 is poor, 50-89 is needs improvement, and 90-100 is good.
    
    Your analysis should include:
    - **SEO**: Check for page title, meta description, H1 tags (should be only one), canonical tags, og:tags, and images without alt attributes.
    - **Performance**: Comment on hypothetical page size, number of requests, and presence of large, unoptimized images.
    - **Security**: Check for common security headers (Strict-Transport-Security, Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) and if HTTPS is used.
    - **Accessibility**: Check for the 'lang' attribute on the <html> tag and mention basic color contrast issues hypothetically.
    - **Commerce Readiness**: Look for structured data like JSON-LD (Product, Offer) and general Schema.org presence. If the site doesn't seem like e-commerce, give a low score but explain why.
    - **Broken Links**: List a few hypothetical broken links (404s).
    - **Quick Wins**: Provide 3-5 actionable, easy-to-implement suggestions for quick improvements.
    
    Generate a varied and realistic report. Do not make every site perfect or terrible. The report should be structured, insightful, and helpful.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reportSchema,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as AuditReport;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from Gemini API.");
  }
};
