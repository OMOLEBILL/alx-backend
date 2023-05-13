#!/usr/bin/env python3
""" We impliment an index function """


def index_range(page: int, page_size: int) -> tuple[int, int] :
    """ We impliment an indexing function to find the 
        start and end of a page
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
