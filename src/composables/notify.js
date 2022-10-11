
import { useQuasar } from 'quasar'
const $q = useQuasar()
export const useNotify = (message, color, textColor) => {
    const notify = () => {
        $q.notify({
             progress: true,
             message: 'Jim emailed you. and please do not reply',
             icon: 'notifications',
             color: 'info',
             position:'bottom-left',
             textColor: 'white',
         })
    }
}