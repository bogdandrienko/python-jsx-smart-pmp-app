class Pagination:
    def __init__(self, items=[], page_size=10):
        self.items = items
        self.page_size = page_size
        self.total_pages = 1 if not self.items else len(self.items) // self.page_size + 1
        self.current_page = 1

    def get_items(self):
        return self.items

    def get_page_size(self):
        return self.page_size

    def get_current_page(self):
        return self.current_page

    def prev_page(self):
        if self.current_page == 1:
            return self
        self.current_page -= 1
        return self

    def next_page(self):
        if self.current_page == self.total_pages:
            return self
        self.current_page += 1
        return self

    def first_page(self):
        self.current_page = 1
        return self

    def last_page(self):
        self.current_page = self.total_pages
        return self

    def go_to_page(self, page):
        if page < 1:
            page = 1
        elif page > self.total_pages:
            page = self.total_pages
        self.current_page = page
        return self

    def get_visible_items(self):
        start = (self.current_page-1) * self.page_size
        return self.items[start:start+self.page_size]

alpabetList = list('abcdefghhklmnt')
p = Pagination(alpabetList, 4)
print(p.get_visible_items())