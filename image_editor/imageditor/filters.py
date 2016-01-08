from PIL import ImageFilter, ImageOps, ImageEnhance, Image


class FilterClass(object):
    THUMBNAIL_SIZE = (100, 100)

    def __init__(self, image):
        self.image = image

    def detail(self):
        return self.image.filter(ImageFilter.EDGE_ENHANCE)

    def invert(self):
        return ImageOps.invert(self.image)

    def flip(self):
        return ImageOps.flip(self.image)

    def mirror(self):
        return ImageOps.mirror(self.image)

    def grayscale(self):
        return ImageOps.grayscale(self.image)

    def blur(self):
        return self.image.filter(ImageFilter.GaussianBlur(radius=10))

    def contour(self):
        return self.image.filter(ImageFilter.CONTOUR)

    def darken(self):
        darken = ImageEnhance.Brightness(self.image)
        return darken.enhance(0.5)

    def thumbnail(self):
        return self.image.thumbnail(self.THUMBNAIL_SIZE, Image.ANTIALIAS)

    def brighten(self):
        enhancer = ImageEnhance.Brightness(self.image)
        return enhancer.enhance(1.5)
