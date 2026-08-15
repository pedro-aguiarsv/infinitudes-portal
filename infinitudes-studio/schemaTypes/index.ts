import {postType} from './post'
import {productType} from './product'
import {siteSettingsType} from './siteSettings'
import {bookInfoType} from './bookInfo'
import {testimonialType} from './testimonial'
import {aboutPageType} from './aboutPage'
import {episodeType} from './episode'
import {galleryPhotoType} from './galleryPhoto'
import {categoryType} from './category'
import {collaboratorType} from './collaborator'

export const schemaTypes = [
  // Conteúdo editorial
  postType,
  episodeType,

  // Loja
  productType,

  // Páginas singletons (1 documento cada)
  bookInfoType,
  aboutPageType,
  siteSettingsType,

  // Auxiliares
  testimonialType,
  galleryPhotoType,
  categoryType,
  collaboratorType,
]
