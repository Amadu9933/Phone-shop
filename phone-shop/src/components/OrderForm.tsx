import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CartItem, Order } from '../data/types'
import { generateWhatsAppMessage, generateWhatsAppLink } from '../utils/whatsapp'
import { storage } from '../utils/storage'
import { orderFormSchema, type OrderFormData } from '../utils/schemas'
import { useNotification } from '../context'

interface OrderFormProps {
    cartItems: CartItem[]
    onOrderSubmitted?: () => void
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const CSS = `
.of-wrap {
  background: #16141F;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* Header band */
.of-head {
  padding: 16px 18px 14px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 10px;
}
@media (min-width: 640px) { .of-head { padding: 18px 22px 16px; } }
.of-head-icon {
  width: 34px; height: 34px; border-radius: 9px;
  background: rgba(232,184,75,0.12);
  border: 1px solid rgba(232,184,75,0.3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.of-head-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 800; color: #F2EDE8;
}
@media (min-width: 640px) { .of-head-title { font-size: 16px; } }
.of-head-sub { font-size: 11.5px; color: #7A728F; margin-top: 1px; }

/* Order summary */
.of-summary {
  padding: 14px 18px;
  background: rgba(13,12,20,0.5);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
@media (min-width: 640px) { .of-summary { padding: 16px 22px; } }
.of-summary-title {
  font-size: 10px; font-weight: 600; letter-spacing: 1.5px;
  text-transform: uppercase; color: #4a4560; margin-bottom: 10px;
}
.of-summary-row {
  display: flex; justify-content: space-between; align-items: baseline;
  font-size: 12.5px; color: #7A728F; padding: 3px 0;
  gap: 12px;
}
.of-summary-row span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
.of-summary-row span:last-child  { flex-shrink: 0; color: #B8B0D0; }
.of-total-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding-top: 10px; margin-top: 8px;
  border-top: 1px solid rgba(255,255,255,0.06);
}
.of-total-label { font-size: 12px; color: #7A728F; }
.of-total-amt   { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #E8B84B; letter-spacing: -0.4px; }
@media (min-width: 640px) { .of-total-amt { font-size: 20px; } }

/* Form body */
.of-body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 12px; }
@media (min-width: 640px) { .of-body { padding: 18px 22px 22px; gap: 14px; } }

/* Field */
.of-field { display: flex; flex-direction: column; gap: 5px; }
.of-label {
  font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
  text-transform: uppercase; color: #7A728F;
}
.of-label-req { color: #E8B84B; margin-left: 2px; }

.of-input, .of-textarea, .of-select {
  width: 100%;
  background: #1E1C2A;
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  padding: 11px 14px;
  color: #F2EDE8;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  outline: none;
  transition: border-color 0.18s, background 0.18s;
  box-sizing: border-box;
  min-height: 48px;
}
@media (min-width: 640px) {
  .of-input, .of-textarea, .of-select { font-size: 13px; padding: 10px 14px; min-height: 40px; }
}
.of-input::placeholder, .of-textarea::placeholder { color: #3a3650; }
.of-input:focus, .of-textarea:focus, .of-select:focus {
  border-color: rgba(232,184,75,0.4);
  background: #221F2E;
}
.of-textarea { resize: vertical; min-height: 90px; line-height: 1.5; }
.of-select   { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%237A728F' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; }
.of-select option { background: #1E1C2A; }

/* Payment method cards */
.of-pay-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.of-pay-card {
  padding: 12px 8px; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.09);
  background: #1E1C2A;
  cursor: pointer; text-align: center;
  transition: all 0.18s;
  display: flex; flex-direction: column; align-items: center; gap: 5px;
  min-height: 68px; justify-content: center;
}
.of-pay-card:hover:not(.selected) { border-color: rgba(255,255,255,0.18); }
.of-pay-card.selected {
  border-color: rgba(232,184,75,0.42);
  background: rgba(232,184,75,0.08);
}
.of-pay-icon { font-size: 20px; line-height: 1; }
.of-pay-label { font-size: 11px; font-weight: 500; color: #9990B8; }
.of-pay-card.selected .of-pay-label { color: #E8B84B; }

/* Error */
.of-error {
  background: rgba(255,83,112,0.08);
  border: 1px solid rgba(255,83,112,0.25);
  border-radius: 10px; padding: 10px 14px;
  font-size: 13px; color: #FF5370;
  display: flex; align-items: center; gap: 8px;
}

/* Submit button */
.of-submit {
  width: 100%; height: 50px; border-radius: 12px; border: none;
  font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  gap: 8px; transition: opacity 0.18s, transform 0.15s; letter-spacing: 0.1px;
  margin-top: 2px;
}
@media (min-width: 640px) { .of-submit { height: 44px; font-size: 14px; } }
.of-submit-gold    { background: #E8B84B; color: #0D0C14; }
.of-submit-gold:hover { opacity: 0.88; transform: scale(0.99); }
.of-submit-green   { background: linear-gradient(135deg, #3ECF8E 0%, #2BA56E 100%); color: #0D0C14; }
.of-submit-green:hover { opacity: 0.88; transform: scale(0.99); }
.of-submit-dis     { background: #1E1C2A; color: #3a3650; cursor: not-allowed; border: 1px solid rgba(255,255,255,0.06); }

/* Success banner */
.of-success {
  padding: 36px 18px;
  display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center;
}
@media (min-width: 640px) { .of-success { padding: 40px 22px; } }
.of-success-ring {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(62,207,142,0.12); border: 1px solid rgba(62,207,142,0.35);
  display: flex; align-items: center; justify-content: center;
}
.of-success-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: #F2EDE8; }
.of-success-sub   { font-size: 13px; color: #7A728F; line-height: 1.5; max-width: 260px; }
.of-order-id      { font-size: 12px; font-weight: 600; color: #E8B84B; background: rgba(232,184,75,0.10); border: 1px solid rgba(232,184,75,0.25); padding: 4px 12px; border-radius: 20px; }
`

let _ofCss = false
function injectFormCss() {
    if (_ofCss || typeof document === 'undefined') return
    const s = document.createElement('style')
    s.textContent = CSS
    document.head.appendChild(s)
    _ofCss = true
}

type PayMethod = 'whatsapp' | 'momo' | 'delivery'

const PAY_OPTIONS: { value: PayMethod; icon: string; label: string }[] = [
    { value: 'whatsapp', icon: '💬', label: 'WhatsApp' },
    { value: 'momo', icon: '📱', label: 'MoMo' },
    { value: 'delivery', icon: '🚚', label: 'On Delivery' },
]

// ─── Component ────────────────────────────────────────────────────────────────
export function OrderForm({ cartItems, onOrderSubmitted }: OrderFormProps) {
    injectFormCss()
    const { addNotification } = useNotification()
    const [success, setSuccess] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
        setValue,
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            customerAddress: '',
            paymentMethod: 'whatsapp',
        },
    })

    const paymentMethod = watch('paymentMethod')
    const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

    const onSubmit = (data: OrderFormData) => {
        if (cartItems.length === 0) {
            addNotification('Your cart is empty', 'error')
            return
        }

        setIsLoading(true)

        const order: Order = {
            id: `ORD-${Date.now()}`,
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            customerEmail: data.customerEmail ?? '',
            customerAddress: data.customerAddress,
            items: cartItems,
            totalAmount: total,
            paymentMethod: data.paymentMethod,
            status: 'pending',
            createdAt: new Date().toISOString(),
        }

        try {
            storage.saveOrder(order)
            addNotification('Order saved successfully!', 'success')

            const message = generateWhatsAppMessage(cartItems, data.customerName, data.customerPhone, data.customerAddress)
            const waLink = generateWhatsAppLink('233540985004', message)
            window.open(waLink, '_blank')

            setSuccess(order.id)
            reset()
            setTimeout(() => {
                setSuccess(null)
                setIsLoading(false)
                onOrderSubmitted?.()
            }, 3000)
        } catch (err) {
            addNotification('Failed to place order. Please try again.', 'error')
            setIsLoading(false)
        }
    }

    // ── Success state ─────────────────────────────────────────────────────────
    if (success) {
        return (
            <div className="of-wrap">
                <div className="of-success">
                    <div className="of-success-ring">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <polyline points="4,12 9,17 20,6" stroke="#3ECF8E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div className="of-success-title">Order Placed!</div>
                    <div className="of-order-id">{success}</div>
                    <div className="of-success-sub">
                        We've opened WhatsApp so you can confirm your order. You'll hear from us shortly.
                    </div>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="of-wrap">

            {/* Header */}
            <div className="of-head">
                <div className="of-head-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#E8B84B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                </div>
                <div>
                    <div className="of-head-title">Checkout</div>
                    <div className="of-head-sub">Fill in your details to complete the order</div>
                </div>
            </div>

            {/* Order summary */}
            <div className="of-summary">
                <div className="of-summary-title">Order Summary</div>
                {cartItems.map(item => (
                    <div key={item.id} className="of-summary-row">
                        <span>{item.name} × {item.quantity}</span>
                        <span>GH₵{(item.price * item.quantity).toLocaleString('en-GH', { minimumFractionDigits: 2 })}</span>
                    </div>
                ))}
                <div className="of-total-row">
                    <span className="of-total-label">Total</span>
                    <span className="of-total-amt">GH₵{total.toLocaleString('en-GH', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>

            {/* Form */}
            <div className="of-body">

                {/* Full name */}
                <div className="of-field">
                    <label className="of-label">Full Name <span className="of-label-req">*</span></label>
                    <input
                        className="of-input"
                        type="text"
                        placeholder="Your full name"
                        {...register('customerName')}
                    />
                    {errors.customerName && <div className="of-error">{errors.customerName.message}</div>}
                </div>

                {/* Phone */}
                <div className="of-field">
                    <label className="of-label">Phone Number <span className="of-label-req">*</span></label>
                    <input
                        className="of-input"
                        type="tel"
                        placeholder="+233 5XX XXX XXX"
                        {...register('customerPhone')}
                    />
                    {errors.customerPhone && <div className="of-error">{errors.customerPhone.message}</div>}
                </div>

                {/* Email */}
                <div className="of-field">
                    <label className="of-label">Email Address <span style={{ fontSize: 10, color: '#3a3650', marginLeft: 4, textTransform: 'none', letterSpacing: 0 }}>optional</span></label>
                    <input
                        className="of-input"
                        type="email"
                        placeholder="your@email.com"
                        {...register('customerEmail')}
                    />
                    {errors.customerEmail && <div className="of-error">{errors.customerEmail.message}</div>}
                </div>

                {/* Address */}
                <div className="of-field">
                    <label className="of-label">Delivery Address <span className="of-label-req">*</span></label>
                    <textarea
                        className="of-textarea"
                        placeholder="Street, area, city…"
                        rows={3}
                        {...register('customerAddress')}
                    />
                    {errors.customerAddress && <div className="of-error">{errors.customerAddress.message}</div>}
                </div>

                {/* Payment method */}
                <div className="of-field">
                    <label className="of-label">Payment Method</label>
                    <div className="of-pay-grid">
                        {PAY_OPTIONS.map(opt => (
                            <div
                                key={opt.value}
                                className={`of-pay-card${paymentMethod === opt.value ? ' selected' : ''}`}
                                onClick={() => setValue('paymentMethod', opt.value, { shouldValidate: true })}
                            >
                                <div className="of-pay-icon">{opt.icon}</div>
                                <div className="of-pay-label">{opt.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {errors.paymentMethod && <div className="of-error">{errors.paymentMethod.message}</div>}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={cartItems.length === 0 || isLoading}
                    className={`of-submit ${cartItems.length === 0 ? 'of-submit-dis' : paymentMethod === 'whatsapp' ? 'of-submit-green' : 'of-submit-gold'}`}
                >
                    {paymentMethod === 'whatsapp' ? (
                        <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {isLoading ? 'Submitting...' : 'Order via WhatsApp'}
                        </>
                    ) : (
                        <>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                            </svg>
                            {isLoading ? 'Submitting...' : 'Complete Order'}
                        </>
                    )}
                </button>
            </div>
        </form>
    )
}

