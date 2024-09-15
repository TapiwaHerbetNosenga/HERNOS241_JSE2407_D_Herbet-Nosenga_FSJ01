import { fetchProductById } from '../../api/api';

const DetailedProducts = ({ product, error }) => {
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.images[0]} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="category">{product.category}</p>
        <p className="description">{product.description}</p>
        {product.tags && (
          <p className="tags">Tags: {product.tags.join(', ')}</p>
        )}
        <p className="rating">Rating: {product.rating} / 5</p>
        <p className="stock">
          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className="reviews">
          <h2>Reviews</h2>
          {product.reviews.length > 0 ? (
            <div className="review-container">
              {product.reviews.map((review) => (
                <div key={review.id} className="review">
                  <p>
                    <strong>{review.name}</strong> Date: {review.date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                  </p>
                  <p>Rated: {review.rating}/5</p>
                  <p>Comment: {review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

        .product-detail-container {
          font-family: Roboto, sans-serif;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: auto;
          background-color: #F5F5F5;
          border-radius: 8px;
        }

        .product-image {
          flex: 1;
          max-width: 400px;
          position: relative;
        }

        .product-image img {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 8px;
          border: 4px solid #ccc;
        }

        .product-info {
          flex: 2;
          padding: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #333;
        }

        .price {
          font-size: 1.8rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 10px;
        }

        .category {
          font-size: 1.2rem;
          color: #7f8c8d;
          margin-bottom: 15px;
        }

        .description {
          font-size: 1.1rem;
          line-height: 1.5;
          margin-bottom: 20px;
          color: #555;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .tag {
          background-color: #F5F5F5;
          border: 1px solid #f5d700;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 0.9rem;
          margin-bottom: 5px;
        }

        .rating {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .rating-star {
          color: #f5d700;
          font-size: 1.2rem;
        }

        .stock {
          font-size: 1.2rem;
          font-weight: bold;
          color: #f5d700;
          margin-bottom: 15px;
        }

        .reviews {
          margin-top: 20px;
        }

        .review {
          border-top: 1px solid #e1e1e1;
          padding: 10px;
          margin-top: 10px;
          width: 100%; /* Make the review span the full width */
          background-color: #FFC107; /* McDonald's yellow */
          border-radius: 8px;
          color: #fff; /* White text */
        }

        .review p {
          font-weight: bold; /* Make review text bold */
        }

        .error {
          color: #e74c3c;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .product-detail-container {
            flex-direction: column;
            align-items: center;
          }

          .product-image {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const product = await fetchProductById(id);
    return { props: { product } };
  } catch (error) {
    return { props: { error: "Product failed to load, try again" } };
  }
}

export default DetailedProducts;