


class RationalModel():
    rational_name = 'ivan'
    rational_place_innovation = f'uploads/rational/{rational_name}/'

    def name(self):
        return self.rational_place_innovation


a = RationalModel



print(RationalModel.name(a))