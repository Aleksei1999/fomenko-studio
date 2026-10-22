export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// в статическом экспорте basePath не подставляется в обычные <img src> и fetch
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const SITE_URL = 'https://aleksei1999.github.io/fomenko-studio';
export const EMAIL = 'profomenkoo@gmail.com';
export const INSTAGRAM_URL = 'https://instagram.com/create.fomenko';
export const INSTAGRAM_HANDLE = '@create.fomenko';

// Фото основателя: положить файл в public/ и указать путь, например '/alex.webp'
export const FOUNDER_PHOTO: string | null = null;

export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
