import React, { Component } from 'react'
import _ from 'lodash'
import {
    Column,
    Table,
    AutoSizer,
    SortDirection,
    SortDirectionType,
} from 'react-virtualized'
import 'react-virtualized/styles.css'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import VTable from './VTable'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface VTableCProps {}

interface VTableStateProps extends SortParamProps {
    sortedList: Array<ItemProps>
    pageIndex: number
}

interface SortParamProps {
    sortBy: string
    sortDirection: SortDirectionType
}

interface ItemProps {
    index: number
    name: string
    description: string
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class VTableContainer extends Component<VTableCProps, VTableStateProps> {
    list: Array<ItemProps> = []
    rowHeight = 30
    pageCountPerRequest = 50

    constructor(props: VTableCProps) {
        super(props)

        this.getListItem()

        const sortBy = 'index'
        const sortDirection = SortDirection.ASC
        const sortedList = this._sortList({ sortBy, sortDirection })

        this.state = {
            sortBy,
            sortDirection,
            sortedList,
            pageIndex: 1,
        } as VTableStateProps
    }

    render() {
        return (
            <VTable>
                <AutoSizer>
                    {({ width, height }) => (
                        <Table
                            width={width}
                            height={height}
                            headerHeight={20}
                            rowHeight={this.rowHeight}
                            sort={this._sort}
                            sortBy={this.state.sortBy}
                            sortDirection={this.state.sortDirection}
                            rowCount={this.state.sortedList.length}
                            rowGetter={({ index }) =>
                                this.state.sortedList[index]
                            }
                            onScroll={this._handleScroll}
                        >
                            <Column label="Index" dataKey="index" width={100} />
                            <Column label="Name" dataKey="name" width={300} />
                            <Column
                                width={500}
                                label="Description"
                                dataKey="description"
                            />
                        </Table>
                    )}
                </AutoSizer>
            </VTable>
        )
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    _sortList = ({ sortBy, sortDirection }: SortParamProps) => {
        let newList = _.sortBy(this.list, [sortBy])
        if (sortDirection === SortDirection.DESC) {
            newList.reverse()
        }
        return newList
    }

    _sort = ({ sortBy, sortDirection }: SortParamProps) => {
        const sortedList = this._sortList({ sortBy, sortDirection })
        this.setState({ sortBy, sortDirection, sortedList })
    }

    _handleScroll = ({
        clientHeight,
        scrollTop,
    }: {
        clientHeight: number
        scrollHeight: number
        scrollTop: number
    }) => {
        const { pageIndex, sortBy, sortDirection } = this.state
        const curLimit =
            this.rowHeight * pageIndex * this.pageCountPerRequest -
            clientHeight * 1.5

        if (curLimit <= scrollTop) {
            try {
                this.getListItem(
                    this.pageCountPerRequest * this.state.pageIndex + 1,
                )

                const sortedList = this._sortList({
                    sortBy,
                    sortDirection,
                })

                this.setState({
                    ...this.state,
                    pageIndex: pageIndex + 1,
                    sortedList,
                })
            } catch (err) {
                console.log(pageIndex)
                console.log('끄으으읏')
            }
        }
    }

    getListItem = (startIndex = 0) => {
        const pageIndex = this.state ? this.state.pageIndex || 1 : 1
        if (pageIndex > 200) throw new Error('Over limit')

        for (
            let i = startIndex, max = startIndex + this.pageCountPerRequest;
            i < max;
            i++
        ) {
            this.list.push({
                index: i,
                name: `${Math.ceil(Math.random() * 10001)} - Brian Vaughn`,
                description: `Developer ${Math.ceil(Math.random() * 10001)}`,
            })
        }
    }
}

export default VTableContainer
