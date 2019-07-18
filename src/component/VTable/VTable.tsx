import React from 'react';
import styled from 'styled-components';

interface VTableFCProps {}

const VTable: React.FC<VTableFCProps> = ({ ...props }) => {
    return <VTableWrapper>{props.children}</VTableWrapper>;
};

const VTableWrapper = styled.section`
    && {
        height: 100%;
        width: 100%;
    }
`;

export default VTable;
