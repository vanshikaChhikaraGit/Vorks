import React, { useState } from 'react';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const StarRating = () => {
  const [rating, setRating] = useState<number | null>(2);
  const [hover, setHover] = useState<number | null>(null);

  const getLabelText = (value: number) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  };

  return (
    <div className="flex items-center w-[200px]">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const ratingValue = star;
          const halfRatingValue = star - 0.5;

          return (
            <label key={star} className="cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                className="hidden"
                aria-label={getLabelText(ratingValue)}
              />
              <div 
                className="relative"
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
              >
                {/* Full star */}
                <span
                  className={`text-2xl ${
                    (hover || rating) && (hover || rating)! >= ratingValue
                      ? 'text-yellow-500'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
                
                {/* Half star (positioned absolutely) */}
                <span
                  className={`absolute top-0 left-0 w-1/2 overflow-hidden text-2xl ${
                    (hover || rating) && 
                    (hover || rating)! >= halfRatingValue && 
                    (hover || rating)! < ratingValue
                      ? 'text-yellow-500'
                      : 'text-transparent'
                  }`}
                  style={{ pointerEvents: 'none' }}
                >
                  ★
                </span>
              </div>
            </label>
          );
        })}
      </div>
      
      {rating !== null && (
        <div className="ml-2 text-sm">
          {labels[hover ? hover : rating]}
        </div>
      )}
    </div>
  );
};

export default StarRating;