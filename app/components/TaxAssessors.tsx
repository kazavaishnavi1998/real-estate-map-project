"use client";

import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TAX_ASSESSORS = gql`
  query {
    attomTaxAssessors {
      items {
        PropertyAddressFull
        PropertyLatitude
        PropertyLongitude
        ATTOM_ID
        parcel_id
      }
    }
  }
`;

const TaxAssessors = () => {
  const { loading, error, data } = useQuery(GET_TAX_ASSESSORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Tax Assessors Data</h1>
      {data.attomTaxAssessors.items.map((item: any, index: number) => (
        <div key={index} className="mb-4 p-4 border rounded shadow">
          <p><strong>Address:</strong> {item.PropertyAddressFull}</p>
          <p><strong>Latitude:</strong> {item.PropertyLatitude}, <strong>Longitude:</strong> {item.PropertyLongitude}</p>
          <p><strong>ATTOM ID:</strong> {item.ATTOM_ID}</p>
          <p><strong>Parcel ID:</strong> {item.parcel_id}</p>
        </div>
      ))}
    </div>
  );
};

export default TaxAssessors;
