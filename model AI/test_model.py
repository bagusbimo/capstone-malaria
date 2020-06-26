import numpy as np
import matplotlib.pyplot as plt

from utilities import config
from skimage.transform import resize
from keras.models import load_model
from sklearn.metrics import classification_report

classes = ['Parasitized', 'Uninfected']

model = load_model('malaria.h5')
print ('Model Loaded Successfully!')

img = plt.imread('single_test/test.png')
img = resize(img, (64, 64, 3))
img = img[np.newaxis, :]
predict = model.predict(img)

print ('The Image passed is of class: {}'.format(classes[np.argmax(predict[0])]))

print ('[INFO]Model Evaluated Successfully!!')