import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useClose } from '../hooks/useCloseHooks';
import { useRef, useState, useCallback } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormType = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormType) => {
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const [selectArticleState, setSelectArticleState] =
		useState(currentArticleState);

	// Функция переключения видимости sidebar при нажатии на кнопку
	const handleToggle = useCallback(() => {
		setMenuOpen((prev) => !prev);
	}, []);

	// Функция для обновления локального состояния формы
	const handleChange = useCallback(
		(key: keyof ArticleStateType, value: OptionType) => {
			setSelectArticleState((prev) => ({
				...prev,
				[key]: value,
			}));
		},
		[]
	);

	// Отправляем форму
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setCurrentArticleState(selectArticleState);
		},
		[selectArticleState, setCurrentArticleState]
	);

	// Cбросываем форму
	const handleReset = useCallback(() => {
		setCurrentArticleState(defaultArticleState);
		setSelectArticleState(defaultArticleState);
	}, [setCurrentArticleState]);

	//   Закрываем Sidebar
	useClose(menuOpen, () => setMenuOpen(false), sidebarRef);

	// Рендер элементов формы
	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={menuOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: menuOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase align='center'>
						Задайте параметры
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='Размер шрифта'
						name='font-size'
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
