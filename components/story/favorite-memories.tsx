import { ChapterHeading } from './chapter-heading'
import { CouplePhoto } from './couple-photo'
import { crops, favoriteMemories, names, photos } from '@/lib/content'

export function FavoriteMemories() {
  return (
    <section aria-labelledby="memories-title" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14">
        <ChapterHeading id="memories-title" number="03" chapter={favoriteMemories.chapter} title={favoriteMemories.title} />
        <p className="max-w-lg text-center text-lg italic text-muted-foreground" data-reveal>
          {favoriteMemories.intro}
        </p>

        <ul className="flex flex-wrap items-start justify-center gap-x-6 gap-y-12 md:gap-x-10">
          {favoriteMemories.polaroids.map((p, i) => (
            <li
              key={p.caption}
              data-tilt-in={p.rotate > 0 ? 1 : -1}
              className={i % 2 === 1 ? 'md:mt-12' : ''}
            >
              <figure
                className="polaroid group w-56 transition-transform duration-500 hover:z-10 hover:-translate-y-2 hover:rotate-0 hover:scale-105 md:w-60"
                style={{ rotate: `${p.rotate}deg` }}
              >
                <span aria-hidden="true" className="tape" />
                <CouplePhoto
                  src={photos[p.photo]}
                  crop={crops[p.crop]}
                  alt={`${names.me} and ${names.him}: ${p.caption}`}
                  sizes="240px"
                  className="aspect-square"
                  imageClassName="sepia-[0.15] transition-[filter] duration-500 group-hover:sepia-0"
                />
                <figcaption className="pt-3 text-center font-script text-2xl leading-tight text-ink">{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
