import { useEffect } from "react";
import PropTypes from "prop-types";

const SEO = ({
  metaTitle,
  metaDescription,
  metaImage,
  metaRobots = "index,follow",
  metaViewport = "width=device-width, initial-scale=1",
  canonicalURL,
  keywords,
  structuredData,
}) => {
  useEffect(() => {
    // Update title
    document.title = metaTitle;

    // Update meta tags
    updateMetaTag("description", metaDescription);
    updateMetaTag("robots", metaRobots);
    updateMetaTag("viewport", metaViewport);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", metaTitle);
    updateMetaTag("og:description", metaDescription);
    if (metaImage?.data?.attributes?.url) {
      updateMetaTag("og:image", metaImage.data.attributes.url);
    }

    // Update canonical URL
    updateCanonicalURL(canonicalURL);

    // Update structured data
    updateStructuredData(structuredData);

    // Cleanup function
    return () => {
      removeMetaTag("description");
      removeMetaTag("robots");
      removeMetaTag("keywords");
      removeMetaTag("og:title");
      removeMetaTag("og:description");
      removeMetaTag("og:image");
      removeStructuredData();
    };
  }, [
    metaTitle,
    metaDescription,
    metaImage,
    metaRobots,
    metaViewport,
    canonicalURL,
    keywords,
    structuredData,
  ]);

  const updateMetaTag = (name, content) => {
    if (!content) return;

    let metaTag = document.querySelector(
      `meta[name="${name}"], meta[property="${name}"]`
    );

    if (!metaTag) {
      metaTag = document.createElement("meta");
      if (name.startsWith("og:")) {
        metaTag.setAttribute("property", name);
      } else {
        metaTag.setAttribute("name", name);
      }
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", content);
  };

  const removeMetaTag = (name) => {
    const metaTag = document.querySelector(
      `meta[name="${name}"], meta[property="${name}"]`
    );
    if (metaTag) {
      metaTag.remove();
    }
  };

  const updateCanonicalURL = (url) => {
    if (!url) return;

    let canonicalTag = document.querySelector('link[rel="canonical"]');

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute("href", url);
  };

  const updateStructuredData = (data) => {
    if (!data) return;

    removeStructuredData();

    const script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("id", "structured-data");
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  const removeStructuredData = () => {
    const script = document.getElementById("structured-data");
    if (script) {
      script.remove();
    }
  };

  return null; // This component doesn't render anything
};

SEO.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  metaImage: PropTypes.object,
  metaRobots: PropTypes.string,
  metaViewport: PropTypes.string,
  canonicalURL: PropTypes.string,
  keywords: PropTypes.string,
  structuredData: PropTypes.object,
};

export default SEO;
