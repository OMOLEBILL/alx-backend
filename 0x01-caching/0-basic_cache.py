#!/usr/bin/python3
""" BaseCaching module
"""


class BaseCaching():
    """ BaseCaching defines:
      - constants of your caching system
      - where your data are stored (in a dictionary)
    """
    MAX_ITEMS = 4

    def __init__(self):
        """ Initiliaze
        """
        self.cache_data = {}

    def print_cache(self):
        """ Print the cache
        """
        print("Current cache:")
        for key in sorted(self.cache_data.keys()):
            print("{}: {}".format(key, self.cache_data.get(key)))

    def put(self, key, item):
        """ Add an item in the cache
        """
        raise NotImplementedError(
            "put must be implemented in your cache class")

    def get(self, key):
        """ Get an item by key
        """
        raise NotImplementedError(
            "get must be implemented in your cache class")


class BasicCache(BaseCaching):
    """ We inherit from the base class and modify with the put and get methods
    """

    def __init__(self):
        """ We intialize the instance and super the main class"""
        super().__init__()

    def put(self, key, item):
        """ We overide the base method from the base class to put some data
        args:
            Key : the key to update from the dictinary
            item : the value of the key
        return:
            Nonething but update the self.cache_data
        """
        if key is not None and item is not None:
            self.cache_data[key] = item
        else:
            return

    def get(self, key):
        """ we retrieve the value of the given key if it's not None and
            it exist in the cache dictionary
        args:
            Key: the key to retrive
        return:
            the value of teh given key
        """
        if key is not None and key in self.cache_data:
            return self.cache_data[key]
        else:
            return None
