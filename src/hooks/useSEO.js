import { useEffect } from 'react';

export const useSEO = ({ title, description }) => {
  useEffect(() => {
    // Update the document title
    if (title) {
      document.title = `${title} | Praveen Kumar - Product Designer`;
    }

    // Update the meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      
      // If the tag doesn't exist, create it
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      
      metaDescription.content = description;
    }

    // Cleanup function not strictly necessary for SEO tags across a SPA,
    // but good practice if we wanted to revert to default state.
  }, [title, description]);
};
