import * as _ from '../../src/These'
import { bindTo } from '../../src/Functor'
import { semigroupString } from '../../src/Semigroup'
import { bind } from '../../src/Monad'
import { apS, apT } from '../../src/Apply'

const A = _.getApplicative(semigroupString)
const M = _.getMonad(semigroupString)

//
// bindTo
//

// $ExpectType <N extends string>(name: N) => <E, A>(fa: These<E, A>) => These<E, { [K in N]: A; }>
bindTo(_.Functor)

// $ExpectType <N extends string>(name: N) => <A>(fa: These<string, A>) => These<string, { [K in N]: A; }>
bindTo<_.URI, string>(M)

//
// bind
//

// $ExpectType <N extends string, A, B>(name: Exclude<N, keyof A>, f: (a: A) => These<string, B>) => (ma: These<string, A>) => These<string, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
bind(M)

//
// apS
//

// $ExpectType <N extends string, A, B>(name: Exclude<N, keyof A>, fb: These<string, B>) => (fa: These<string, A>) => These<string, { [K in N | keyof A]: K extends keyof A ? A[K] : B; }>
apS<_.URI, string>(A)

//
// apT
//

// $ExpectType <B>(fb: These<string, B>) => <A extends readonly unknown[]>(fas: These<string, A>) => These<string, readonly [...A, B]>
apT<_.URI, string>(A)
