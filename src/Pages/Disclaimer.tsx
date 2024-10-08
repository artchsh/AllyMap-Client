import React from 'react'
import { m } from 'framer-motion'
import { Home } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Disclaimer() {
	
	// Setups
	const navigate = useNavigate()

	return (
		<m.div className='flex flex-col w-screen h-screen' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<div className='m-2 flex justify-center items-center cursor-default hover:cursor-pointer hover:text-violet-200 duration-150 ease-in-out transition' onClick={() => { navigate('/') }}>
				<Home className='mr-2' />
				Вернуться домой
			</div>
			<div className='mx-2'>
				<p className='text-2xl font-bold'>{'ДИСКЛЕЙМЕР (ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ)'}</p>

				<p className='text-zinc-200'>При использовании сайта www.allymap.info Вы соглашаетесь с приведенными ниже условиями:</p>

				<p className='text-xl font-semibold mt-2'>Положение о конфиденциальности</p>

				<p className='text-zinc-200'>Вы можете посещать данный сайт, не давая о себе никакой личной информации. Наш сайт собирает информацию о посетителях с помощью Яндекс Метрика, где фиксируется только информация об интернет-провайдере посетителя и адрес интернет-страницы, с которого посетитель пришел на наш сайт. Результаты только собираются для статистики и ни в коем случае никуда не отправляются. Все собранные данные не будут передаваться третьим лицам или продаваться.</p>

				<p className='text-xl font-semibold mt-2'>Отказ от ответственности</p>

				<p className='text-zinc-200'>Вся информация на сайте предназначена только для личного пользования. Администрация сайта оставляет за собой право вносить изменения в текст, также текст может содержать опечатки. Мы делаем все возможное, чтобы информация на этом сайте была как можно более полной и точной. Администрация сайта не несет никакой ответственности за любой ущерб, который может быть причинен в любой форме за счет использования, неполноты или неправильности информации, размещенной на этом сайте.</p>

				<p className='text-xl font-semibold mt-2'>Доступность</p>

				<p className='text-zinc-200'>Мы делаем все возможное для работы сайта, но не несем никакой ответственности за любые последствия, которые могут возникнуть в связи с (временной) прекращением работы сайта. Материалы используются в некоммерческих целях. Владельцы и создатели сайта www.allymap.info не несут ответственность за использование материалов, доступных на сайте. Все материалы размещены исключительно в ознакомительных целях.Вся материалы и ссылки, расположенные на сайте предназначены только для удовлетворения любопытства уважаемых посетителей, владельцы и создатели сайта не несут ответственность за возможные последствия использования их в целях, запрещенных законами Республики Казахстан. Пользователи несут самостоятельную ответственность за порядок использования и распространения материалов сайта www.allymap.info согласно местному законодательству своей страны проживания. Администрация  www.allymap.info не владеет правовой информацией по каждой конкретной стране и не отслеживает изменений в законодательных нормах различных стран. Если Вы являетесь автором материалов или обладателем авторских прав на него, но Ваше авторство не было указано или Вы возражаете против его использования на сайте  www.allymap.info – пожалуйста свяжитесь с владельцами сайта по электронному адресу: <a className='underline' href="mailto:secretariat@allymap.info?subject=Запрос на удаление материалов/заведения">secretariat@allymap.info</a>. Материалы будут скорректированы или удалены в максимально короткие сроки.</p>
			</div>
		</m.div>
	)
}