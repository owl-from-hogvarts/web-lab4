import styled from "@emotion/styled";
import { PointCheckResult } from "app/api/point";
import { colors } from "app/styles/colors";
import React from "react";

export type PointsTableProps = {
  points: PointCheckResult[];
};

const ResultsTable = styled.table`
  border-collapse: collapse;
  overflow: hidden;

  & tr {
    border-bottom: 0.1rem solid ${colors.backgroundLight};
  }

  & th,
  & td {
    text-align: center;
  }

  & thead {
    & th {
      padding: 0.5rem;
      /* border: 0.1rem solid var(--color-background-light); */
    }
  }

  & tbody {
    & tr:last-child {
      border-bottom: none;
    }

    & td {
      padding: 0.3rem;
    }
  }
`;

export default function PointsTable({ points }: PointsTableProps) {
  return (
    <results-container className="rounded">
      <ResultsTable id="results-table">
        <thead>
          <tr>
            <th>Point(x)</th>
            <th>Point(y)</th>
            <th>Scale</th>
            <th>Result</th>
            <th>Calculated At</th>
            <th>Time of Computation</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point) => (
            <Row point={point} key={point.id} ></Row>
          ))}
        </tbody>
      </ResultsTable>
    </results-container>
  );
}

type RowProps = {
  point: PointCheckResult;
};

function Row({
  point: { pointX, pointY, scale, calculatedAt, calculationTime, isIntersects },
}: RowProps) {  
  return (
    <tr>
      <td>{pointX}</td>
      <td>{pointY}</td>
      <td>{scale}</td>
      <td>{formatResult(isIntersects)}</td>
      <td>{formatCalculatedAt(calculatedAt)}</td>
      <td>{calculationTime}</td>
    </tr>
  );
}

function formatCalculatedAt(calculatedAt: number) {
  return new Date(calculatedAt).toLocaleTimeString("ru-RU");
}

function formatResult(result: boolean) {
  return result ? "Intersects" : "Not intersects";
}
