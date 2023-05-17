#!/usr/bin/python3

""" In this module we impliment the get and put methods
"""


BaseCaching = __import__("base_caching").BaseCaching


class LRUCache(BaseCaching):
    """ We inherit from the base class and modify with the put and get methods
    """

    def __init__(self):
        """ we initialize the FiFOCache class and super the base class """
        super().__init__()
        self.key = []

    def put(self, key, item):
        """ We overide the base method from the base class to put some data
            if the number of items in self.cache_data is higher than
            BaseCaching.Max_items:
                 we discard the List used item and print discard with the key
        args:
            Key : the key to update from the dictinary
            item : the value of the key
        return:
            Nonething but update the self.cache_data
        """
        if key is None or item is None:
           return
        if len(self.cache_data) == BaseCaching.MAX_ITEMS:
            if key not in self.cache_data:
                index = self.key.pop(0)
                del self.cache_data[index]
                print("DISCARD: {}".format(index))
        if key in self.key:
            self.key.remove(key)
        self.cache_data[key] = item
        self.key.append(key) 

    def get(self, key):
        """ we retrieve the value of the given key if it's not None and
            it exist in the cache dictionary
        args:
            Key: the key to retrive
        return:
            the value of teh given key
        """
        if key is None or key not in self.cache_data:
            return None
        self.key.remove(key)
        self.key.append(key)
        return self.cache_data.get(key)
