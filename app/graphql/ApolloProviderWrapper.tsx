"use client";

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../graphql/apollo-client';

const ApolloProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
