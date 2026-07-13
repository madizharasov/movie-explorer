import './moviecard.css'

function MovieCard({ movie, index }) {
	const hasPoster = movie.Poster && movie.Poster !== 'N/A'
	const ages = ['16+', '18+', '12+', '6+']

	return (
		<div className='movie-card'>
			<div className='poster-wrap'>
				{index === 0 && <span className='top-badge'>Хит поиска</span>}
				<img
					src={
						hasPoster
							? movie.Poster
							: 'https://placehold.co/420x620/1a1a1a/ff8c00?text=Movie'
					}
					alt={movie.Title}
				/>
				<span className='service-badge'>и</span>
				<span className='age-badge'>{ages[index % ages.length]}</span>
			</div>
			<div className='movie-info'>
				<h3>{movie.Title}</h3>
				<p>{movie.Year}</p>
			</div>
		</div>
	)
}

export default MovieCard
