import { useState } from 'react'
import MovieCard from './components/Moviecard'
import './App.css'

const quickFilters = [
	'Подборки фильмов',
	'2026 год',
	'2025 год',
	'2024 год',
	'2023 год',
	'2022 год',
	'Бесплатные',
	'Русские фильмы',
]

const filters = ['Жанры', 'Поджанры', 'Страны', 'Годы', 'Рейтинг Иви']

const badges = ['Бесплатные', 'По подписке', 'На языке оригинала', 'С субтитрами']

function App() {
	const [searchText, setSearchText] = useState('Batman')
	const [movies, setMovies] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	const handleSearch = async () => {
		const query = searchText.trim()

		if (query.length === 0) {
			setError('Введите название фильма')
			return
		}

		try {
			setLoading(true)
			setError('')

			const response = await fetch(
				`https://www.omdbapi.com/?apikey=efde6cb9&s=${query}`
			)
			const data = await response.json()

			if (data.Response === 'False') {
				setMovies([])
				setError('Фильм не найден')
			} else {
				setMovies(data.Search)
			}
		} catch {
			setError('Не удалось получить данные.')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='app'>
			<header className='hero'>
				<p className='eyebrow'>онлайн каталог</p>
				<h1>Movie Explorer</h1>

				<div className='search-box'>
					<input
						type='text'
						value={searchText}
						placeholder='Название фильма'
						onChange={e => setSearchText(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<button onClick={handleSearch}>Найти</button>
				</div>
			</header>

			<nav className='quick-filters' aria-label='Быстрые фильтры'>
				{quickFilters.map(item => (
					<button key={item}>{item}</button>
				))}
			</nav>

			<section className='filter-panel' aria-label='Фильтры'>
				<div className='select-row'>
					{filters.map(item => (
						<button className='select-pill' key={item}>
							{item}
							<span>⌄</span>
						</button>
					))}
				</div>

				<div className='badge-row'>
					{badges.map(item => (
						<button className='outline-pill' key={item}>
							<span>+</span>
							{item}
						</button>
					))}
					<button className='reset-button'>× Сбросить фильтры</button>
				</div>
			</section>

			<main>
				<div className='section-title'>
					<h2>Фильмовый топ</h2>
					<span>›</span>
				</div>

				{movies.length === 0 && !loading && !error && (
					<p className='message'>Начните поиск фильма</p>
				)}
				{loading && <p className='message'>Загрузка...</p>}
				{error && <p className='message error'>{error}</p>}

				<div className='movies-container'>
					{movies.map((movie, index) => (
						<MovieCard key={movie.imdbID} movie={movie} index={index} />
					))}
				</div>
			</main>
		</div>
	)
}

export default App
