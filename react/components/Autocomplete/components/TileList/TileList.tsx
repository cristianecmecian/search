import React, { FC } from 'react'
import { ExtensionPoint, Link } from 'vtex.render-runtime'
import { Spinner } from 'vtex.styleguide'
import ProductSummary from 'vtex.product-summary/ProductSummaryCustom'
import { FormattedMessage } from 'react-intl'

import styles from './styles.css'
import CustomListItem from '../CustomListItem/CustomListItem'
import { ProductLayout } from '../..'

interface TileListProps {
  term: string
  title: string | JSX.Element
  products: any[]
  showTitle: boolean
  shelfProductCount: number
  totalProducts: number
  layout: ProductLayout
  isLoading: boolean
  onProductClick: (product: string, position: number) => void
  onSeeAllClick: (term: string) => void
}

const TileList: FC<TileListProps> = ({
  term,
  title,
  products,
  showTitle,
  totalProducts,
  layout,
  isLoading,
  onProductClick,
  onSeeAllClick,
}) => {
  if (products.length === 0 && !isLoading) {
    return null
  }

  return (
    <section className={styles.tileList}>
      {showTitle ? (
        <p className={`${styles.tileListTitle} c-on-base`}>{title}</p>
      ) : null}
      {isLoading ? (
        <div className={styles.tileListSpinner}>
          <Spinner />
        </div>
      ) : (
        <>
          <ul
            className={styles.tileListList}
            style={{
              flexDirection:
                layout === ProductLayout.Horizontal ? 'column' : 'row',
            }}
          >
            {products.map((product, index: number) => {
              const productSummary = ProductSummary.mapCatalogProductToProductSummary(
                product
              )

              return (
                <li key={product.productId} className={styles.tileListItem}>
                  {layout === ProductLayout.Horizontal ? (
                    <CustomListItem
                      product={productSummary}
                      onClick={() => {
                        onProductClick(productSummary.productId, index)
                      }}
                    />
                  ) : (
                    <ExtensionPoint
                      id="product-summary"
                      product={productSummary}
                      actionOnClick={() => {
                        onProductClick(productSummary.productId, index)
                      }}
                    />
                  )}
                </li>
              )
            })}
          </ul>

          <footer>
            {totalProducts > 0 ? (
              <Link
                to={`/${term}`}
                query="map=ft"
                className={styles.tileListSeeMore}
                onClick={() => onSeeAllClick(term)}
              >
                <FormattedMessage
                  id="store/seeMore"
                  values={{ count: totalProducts }}
                />
              </Link>
            ) : null}
          </footer>
        </>
      )}
    </section>
  )
}

export default TileList
