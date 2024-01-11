'use client';
import React, { useEffect, useState, useRef, RefObject } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import materialsData from '../../data/mockData';
import arrowRight from '../../assets/svg/arrow-right.svg';
import arrowLeft from '../../assets/svg/arrow-left.svg';

interface SliderData {
    id: number;
    types: string;
    img: string;
    title: string;
    date: string;
}

function Slider() {
    const [materialSizeType, setMaterialSizeType] = useState<boolean[]>(
        materialsData.map((item) => item.title.length > 35)
    );
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const slideAction = (direction: 'left' | 'right') => {
        const slider = sliderRef.current;

        if (slider) {
            const totalSlides = slider.children.length;
            let newIndex;

            if (direction === 'left') {
                newIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            } else {
                newIndex = (currentSlide + 1) % totalSlides;
            }

            slider.scrollTo({
                left: newIndex * 344,
                behavior: 'smooth',
            });

            setCurrentSlide(newIndex);
        }
    };

    useEffect(() => {
        if (materialsData.some((item) => item.title.length > 35)) {
            setMaterialSizeType(materialsData.map(() => true));
        }
    }, []);

    const getRandomBorderRadius = (prevValue: string | undefined) => {
        const borderRadiusOptions = ['220px 0 220px 0', '120px 0px 120px 0px'];

        // Если предыдущее значение '50%', исключаем его из вариантов
        const filteredOptions =
            prevValue === '50%'
                ? borderRadiusOptions
                : ['50%', ...borderRadiusOptions];

        const randomIndex = Math.floor(Math.random() * filteredOptions.length);
        return filteredOptions[randomIndex];
    };

    return (
        <div className={styles.slider}>
            <div className={styles.slider__mask}>
                <div
                    className={styles.slider__list}
                    ref={sliderRef}
                >
                    {materialsData.map((item: SliderData, index) => (
                        <div
                            className={styles.slider__item}
                            key={item.id}
                        >
                            <Image
                                src={item.img}
                                alt=""
                                width={item.title.length > 35 ? 688 : 344}
                                height={344}
                                style={{
                                    borderRadius:
                                        item.title.length > 35
                                            ? '600px'
                                            : getRandomBorderRadius(
                                                  materialSizeType[index - 1]
                                                      ? '50%'
                                                      : undefined
                                              ),
                                }}
                            />
                            <h2 className={styles.slider__title}>
                                {item.title}
                            </h2>
                            <p className={styles.slider__date}>{item.date}</p>
                        </div>
                    ))}
                    <div style={{ width: '200px' }}></div>
                </div>
            </div>
            <div className={styles.slider__controllers}>
                <button
                    className={styles.slider__arrow_right}
                    onClick={() => slideAction('right')}
                >
                    <Image
                        src={arrowRight}
                        alt=""
                        width={100}
                        height={20}
                    />
                </button>
                <button
                    className={styles.slider__arrow_left}
                    onClick={() => slideAction('left')}
                >
                    <Image
                        src={arrowLeft}
                        alt=""
                        width={100}
                        height={20}
                    />
                </button>
            </div>
        </div>
    );
}

export default Slider;
