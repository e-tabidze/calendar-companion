import useNotifications from 'src/hooks/useNotifications'
import { useRouter } from 'next/router'
import ListItem from 'src/views/components/notifications/listItem'
import Details from 'src/views/components/notifications/details'
import { useEffect } from 'react'
import Typography from 'src/views/components/typography'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Pagination from 'src/views/components/pagination'

const Notifications = () => {
  const router = useRouter()
  const { id, company, page } = router.query

  const { notifictions, refetchNotifications, notificationsLoading } = useNotifications(
    undefined,
    undefined,
    Number(page)
  )

  useEffect(() => {
    refetchNotifications()
  }, [router.asPath, id, company])

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  if (notificationsLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      {router.query.id ? (
        <Details id={String(id)} company={String(company)} />
      ) : (
        <>
          <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
            <Typography type='h3' className='mb-6'>
              შეტყობინებები
            </Typography>
            <ul>
              {notifictions?.data?.length > 0 ? (
                notifictions?.data?.map((notification: any) => (
                  <ListItem
                    url={`/dashboard/notifications/?id=${notification?.id}&company=${notification?.data?.company_id}`}
                    notification={notification}
                    key={notification?.id}
                  />
                ))
              ) : (
                <DataPlaceHolder label='შეტყობინებები ჯერ არ გაქვს' />
              )}
            </ul>
          </div>
          {notifictions?.last_page > 1 && (
            <Pagination
              totalPages={notifictions?.last_page}
              onPageChange={handlePageChange}
              currentPage={Number(page)}
            />
          )}
        </>
      )}
    </>
  )
}

export default Notifications
