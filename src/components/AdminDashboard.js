import React from 'react';

function AdminDashboard() {

    const updateFBIData = async () => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/fbi/getwanted', {
                method: 'GET',
            });
            if (response.ok) {
                console.log('Dados do FBI atualizados com sucesso!');
            } else {
                console.error('Falha ao atualizar dados do FBI');
            }
        } catch (error) {
            console.error('Erro ao atualizar dados do FBI', error);
        }
    };

    const updateInterpolData = async () => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/interpol/getnotices', {
                method: 'GET',
            });
            if (response.ok) {
                console.log('Dados da INTERPOL atualizados com sucesso!');
            } else {
                console.error('Falha ao atualizar dados da INTERPOL');
            }
        } catch (error) {
            console.error('Erro ao atualizar dados da INTERPOL', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Painel de Administração</h1>
            <div className="mb-3">
                <button 
                    className="btn btn-primary" 
                    onClick={updateFBIData}
                >
                    Atualizar Dados do FBI
                </button>
            </div>
            <div>
                <button 
                    className="btn btn-primary" 
                    onClick={updateInterpolData}
                >
                    Atualizar Dados da INTERPOL
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
