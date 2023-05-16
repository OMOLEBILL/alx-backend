#!/usr/bin/env python3
""" BaseCaching module
"""
BaseCaching = __import__("BaseCaching").BaseCaching


class BasicCache(BaseCaching):
    """ We inherit from the base class and modify with the put and get methods
    """

    def put(self, key, item):
        """ We overide the base method from the base class to put some data
        args:
            Key : the key to update from the dictinary
            item : the value of the key
        return:
            Nonething but update the self.cache_data
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ we retrieve the value of the given key if it's not None and
            it exist in the cache dictionary
        args:
            Key: the key to retrive
        return:
            the value of teh given key
        """
        if key and key in self.cache_data:
            return self.cache_data.get(key)
        else:
            return None
