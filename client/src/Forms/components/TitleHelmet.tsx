import { HelmetProps } from '@/types';
import React from 'react';
import { Helmet } from 'react-helmet-async';
const TitleHelmet: React.FC<HelmetProps> = ({ og_type, og_description, og_title, title, description_content, keywords_content }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={`${description_content}`} />
        <meta name="keywords" content={`${keywords_content}`} />
        <meta property="og:title" content={`${og_title}`} />
        <meta property="og:description" content={`${og_description}`} />
        <meta property="og:type" content={`${og_type}`} />
      </Helmet>
    </>
  )
}

export default TitleHelmet
